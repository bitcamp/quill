const request = require('request');
const UserController = require('../../controllers/UserController');

const _getToken = req => req.headers['x-access-token'];

/**
 * Use access token to make sure user is an admin
 */
const isAdmin = (req, res, next) => {
  const token = _getToken(req);

  UserController.getByToken(token, function (err, user) {
    if (err) {
      return res.status(500).send(err);
    }

    if (user && user.admin) {
      req.user = user;
      return next();
    }

    return res.status(401).send({
      message: 'Get outta here, punk!'
    });
  });
}

/**
 * Check that the id param matches the id encoded in the
 * access token provided.
 *
 * That, or you're the admin, so you can do whatever you
 * want I suppose!
 */
const isOwnerOrAdmin = (req, res, next) => {
  const token = _getToken(req);
  const userId = req.params.id;

  UserController.getByToken(token, function (err, user) {
    if (err || !user) {
      return res.status(500).send(err);
    }

    if (user._id == userId || user.admin) {
      return next();
    }

    return res.status(400).send({
      message: 'Token does not match user id.'
    });
  });
}

const isOrganizerOrAdmin = (req, res, next) => {
  const token = _getToken(req);

  UserController.getByToken(token, function (err, user) {
    if (err || !user) {
      return res.status(500).send(err);
    }

    if (user.organizer || user.admin) {
      return next();
    }

    return res.status(400).send({
      message: 'Token does not match user id.'
    });
  });
}

/**
 * Default response to send an error and the data.
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
const defaultResponse = (req, res) => {
  return function (err, data) {
    if (err) {
      // SLACK ALERT!
      if (process.env.NODE_ENV === 'production') {
        request
          .post(process.env.SLACK_HOOK, {
              form: {
                payload: JSON.stringify({
                  "text": "``` \n" +
                    "Request: \n " +
                    req.method + ' ' + req.url +
                    "\n ------------------------------------ \n" +
                    "Body: \n " +
                    JSON.stringify(req.body, null, 2) +
                    "\n ------------------------------------ \n" +
                    "\nError:\n" +
                    JSON.stringify(err, null, 2) +
                    "``` \n"
                })
              }
            },
            function (_error, _response, _body) {
              return res.status(500).send({
                message: "Your error has been recorded, we'll get right on it!"
              });
            }
          );
      } else {
        return res.status(500).send(err);
      }
    } else {
      return res.json(data);
    }
  };
}

module.exports = {
  isAdmin,
  isOwnerOrAdmin,
  isOrganizerOrAdmin,
  defaultResponse,
};