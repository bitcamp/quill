const User = require('../models/User');
const Settings = require('../models/Settings');
const Event = require('../models/Event');
const Mailer = require('../services/email');
const Stats = require('../services/stats');

const validator = require('validator');
const moment = require('moment');

let UserController = {};

/**
 * Determine whether or not a user can register.
 * @param  {String}   email    Email of the user
 * @param  {Function} callback args(err, true, false)
 * @return {[type]}            [description]
 */
function canRegister(email, password, callback) {
  if (!password || password.length < 6){
    return callback({ message: "Password must be 6 or more characters."}, false);
  }

  // Check if its within the registration window.
  Settings.getRegistrationTimes(function(err, times) {
    if (err) {
      callback(err);
    }

    const now = Date.now();

    if (now < times.timeOpen){
      return callback({
        message: "Registration opens in " + moment(times.timeOpen).fromNow() + "!"
      });
    }

    if (now > times.timeClose){
      return callback({
        message: "Sorry, registration is closed."
      });
    }

    return callback(null, true);
  });
}

/**
 * Login a user given a token
 * @param  {String}   token    auth token
 * @param  {Function} callback args(err, token, user)
 */
UserController.loginWithToken = function(token, callback){
  User.getByToken(token, function(err, user){
    return callback(err, token, user);
  });
};

/**
 * Logs a user in with a temporary code that is emailed to them
 * @param {String} email
 * @param {String} code
 * @param {Functio} callback
 */
UserController.loginWithTempCode = function(email, code, callback) {
  if(!code || code.length === 0) {
    return callback({
      message: 'Please enter a code'
    });
  }

  User
    .findOneByEmail(email)
    .exec((err, user) => {
      if (err) {
        return callback(err);
      }

      if (!user) {
        return callback({
          message: "We couldn't find you!"
        });
      }

      if (!user.checkTempCode(code)) {
        return callback({
          message: "That's not the right login code."
        });
      }

      const token = user.generateAuthToken();
      let u = user.toJSON();

      // Expire code
      User.findOneAndUpdate({
        'email': email,
      },
      {
        $set: {
          'loginCodeExpiration': Date.now(),
        }
      }, function(err, user) {
        return callback(null, token, u);
      });
  });
};

/**
 * Temp login code email
 * @param  {[type]}   email
 * @param  {Function} callback
 * @return {[type]}
 */
UserController.sendTempLoginCode = function(email, callback){
  User
    .findOneByEmail(email)
    .exec(function(err, user){
      if (err) {
        return callback(err);
      }
      if (!user) {
        return callback({ message: 'No account exists with that email' });
      }

      const code = user.generateTempCode();

      const time = new Date(Date.now() + 5*60*1000);

      User.findOneAndUpdate({
        'email': email,
      },
        {
          $set: {
            'loginCode': code,
            'loginCodeExpiration': time.getTime(),
          }
        }, {
          new: true
        },
        function(err, user){
          if (err || !user){
            return callback(err);
          }
          Mailer.sendTempLoginCode(email, code, callback);
          return callback(err, user);
        });
    });
};

/**
 * Login a user given an email and password.
 * @param  {String}   email    Email address
 * @param  {String}   password Password
 * @param  {Function} callback args(err, token, user)
 */
UserController.loginWithPassword = function(email, password, callback){
  if (!password || password.length === 0){
    return callback({
      message: 'Please enter a password'
    });
  }

  if (!validator.isEmail(email)){
    return callback({
      message: 'Invalid email'
    });
  }

  User
    .findOneByEmail(email)
    .select('+password')
    .exec(function(err, user) {
      if (err) {
        return callback(err);
      }
      if (!user) {
        return callback({
          message: "We couldn't find you!"
        });
      }
      if (!user.checkPassword(password)) {
        return callback({
          message: "That's not the right password."
        });
      }

      // yo dope nice login here's a token for your troubles
      const token = user.generateAuthToken();
      let u = user.toJSON();
      delete u.password;

      return callback(null, token, u);
  });
};

/**
 * Create a new user given an email and a password.
 * @param  {String}   email    User's email.
 * @param  {String}   password [description]
 * @param  {Function} callback args(err, user)
 */
UserController.createUser = function(email, password, callback) {
  if (typeof email !== "string") {
    return callback({
      message: "Email must be a string."
    });
  }

  email = email.toLowerCase();

  // Check that there isn't a user with this email already.
  canRegister(email, password, function(err, valid){
    if (err || !valid) {
      return callback(err);
    }

    User
      .findOneByEmail(email)
      .exec(function(err, user) {
        if (err) {
          return callback(err);
        }

        if (user) {
          return callback({
            message: 'An account for this email already exists.'
          });
        } else {
          // Make a new user
          var u = new User();
          u.email = email;
          u.password = User.generateHash(password);
          u.save(function(err){
            if (err){
              return callback(err);
            } else {
              // yay! success.
              const token = u.generateAuthToken();

              // Send over a verification email
              const verificationToken = u.generateEmailVerificationToken();
              Mailer.sendVerificationEmail(email, verificationToken);
              return callback(null, {
                  token: token,
                  user: u
              });
            }
          });

        }
    });
  });
};

UserController.getByToken = function (token, callback) {
  User.getByToken(token, callback);
};

/**
 * Get all users.
 * It's going to be a lot of data, so make sure you want to do this.
 * @param  {Function} callback args(err, user)
 */
UserController.getAll = function (callback) {
  User.find({}, callback);
};

/**
 * Get a page of users.
 * @param  {[type]}   page     page number
 * @param  {[type]}   size     size of the page
 * @param  {Function} callback args(err, {users, page, totalPages})
 */
UserController.getPage = function(query, callback){
  var page = query.page;
  var size = parseInt(query.size);
  var searchText = query.text;

  var findQuery = {};
  if (searchText.length > 0){
    var queries = [];
    var re = new RegExp(searchText, 'i');
    queries.push({ email: re });
    queries.push({ 'profile.name': re });
    findQuery.$or = queries;
  }

  User
    .find(findQuery)
    .sort({
      'profile.name': 'asc'
    })
    .select('+status.admittedBy')
    .skip(page * size)
    .limit(size)
    .exec(function (err, users){
      if (err || !users){
        return callback(err);
      }

      User.count(findQuery).exec(function(err, count){

        if (err){
          return callback(err);
        }

        return callback(null, {
          users: users,
          page: page,
          size: size,
          totalPages: Math.ceil(count / size)
        });
      });

    });
};

/**
 * Get a user by id.
 * @param  {String}   id       User id
 * @param  {Function} callback args(err, user)
 */
UserController.getById = function (id, callback){
  User.findById(id, callback);
};

/**
 * Update a user's profile object, given an id and a profile.
 *
 * @param  {String}   id       Id of the user
 * @param  {Object}   profile  Profile object
 * @param  {Function} callback Callback with args (err, user)
 */
UserController.updateProfileById = function (id, profile, callback){
  // Validate the user profile, and mark the user as profile completed
  // when successful.
  User.validateProfile(profile, function(err){
    if (err){
      return callback({message: 'invalid profile'});
    }

    // Check if its within the registration window.
    Settings.getRegistrationTimes(function(err, times){
      if (err) {
        callback(err);
      }

      const now = Date.now();

      if (now < times.timeOpen){
        return callback({
          message: "Registration opens in " + moment(times.timeOpen).fromNow() + "!"
        });
      }

      if (now > times.timeClose){
        return callback({
          message: "Sorry, registration is closed."
        });
      }
    });

    User.findOneAndUpdate({
      _id: id,
      verified: true
    }, {
      $set: {
        'lastUpdated': Date.now(),
        'profile': profile,
        'status.completedProfile': true
      },
      $min: {
        'firstSubmitted': Date.now(),
      },
    }, {
      new: true
    },
      callback);
  });
};

/**
 * Update a user's confirmation object, given an id and a confirmation.
 *
 * @param  {String}   id            Id of the user
 * @param  {Object}   confirmation  Confirmation object
 * @param  {Function} callback      Callback with args (err, user)
 */
UserController.updateConfirmationById = function (id, confirmation, callback) {
  User.findById(id, function(err, user){
    if(err || !user){
      return callback(err);
    }

    // Make sure that the user followed the deadline, but if they're already confirmed
    // that's okay.
    if (Date.now() >= user.status.confirmBy && !user.status.confirmed){
      return callback({
        message: "You've missed the confirmation deadline."
      });
    }

    // You can only confirm acceptance if you're admitted and haven't declined.
    User.findOneAndUpdate({
      '_id': id,
      'verified': true,
      'status.admitted': true,
      'status.declined': {$ne: true}
    },
      {
        $set: {
          'lastUpdated': Date.now(),
          'confirmation': confirmation,
          'status.confirmed': true,
        }
      }, {
        new: true
      },
      callback);
  });
};

/**
 * Decline an acceptance, given an id.
 *
 * @param  {String}   id            Id of the user
 * @param  {Function} callback      Callback with args (err, user)
 */
UserController.declineById = function (id, callback){
  // You can only decline if you've been accepted.
  const conditions = {
    '_id': id,
    'verified': true,
    'status.admitted': true,
    'status.declined': false
  };
  const update = {
    $set: {
      'lastUpdated': Date.now(),
      'status.confirmed': false,
      'status.declined': true
    }
  };
  const options = { new: true };
  User.findOneAndUpdate(conditions, update, options, callback);
};

UserController.favoriteEvent = function (id, eventId, callback) {
  User.findById(id, function(err, user) {
    if (err) {
      return callback(err);
    }
    if (!user) {
      return callback({message: 'We could not find this user'});
    }

    if (user.favoritedEvents.some(function(favoritedEventId) {
      return favoritedEventId.equals(eventId);
    })) {
      console.log('includes');
      return callback({message: 'You have already favorited this event'});
    }

    User.update(
      {_id: id},
      {$push: {favoritedEvents: eventId}},
      function (err, user) {
        if (err) {
          return callback(err);
        }

        // TODO: rollback user update if event update fails
        Event
          .findOneAndUpdate(
            {_id: eventId},
            {$inc: {'numFavorited': 1}},
            function(err, _event) {
              if (err) {
                return callback(err);
              }
              return callback(null, user);
            })
      })
  });
}

UserController.unfavoriteEvent = function (id, eventId, callback) {
  User.findById(id, function(err, user) {
    if (err) {
      return callback(err);
    }
    if (!user) {
      return callback({message: 'We could not find this user'});
    }

    if (!user.favoritedEvents.some(function(favoritedEventId) {
      return favoritedEventId.equals(eventId);
    })) {
      console.log('includes');
      return callback({message: 'You did not have this event favorited'});
    }

    User.update(
      {_id: id},
      {$pull: {favoritedEvents: eventId}},
      function (err, user) {
        if (err) {
          return callback(err);
        }

        // TODO: rollback user update if event update fails
        Event
          .findOneAndUpdate(
            {_id: eventId},
            {$inc: {'numFavorited': -1}},
            function(err, _event) {
              if (err) {
                return callback(err);
              }
              return callback(null, user);
            })
      })
  });
}

/**
 * Verify a user's email based on an email verification token.
 * @param  {[type]}   token    token
 * @param  {Function} callback args(err, user)
 */
UserController.verifyByToken = function(token, callback) {
  User.verifyEmailVerificationToken(token, function(err, email){
    if (err) {
      return callback(err);
    }

    User.findOneAndUpdate({
      email: email.toLowerCase()
    },{
      $set: {
        'verified': true
      }
    }, {
      new: true
    },
    callback);
  });
};

/**
 * Resend an email verification email given a user id.
 */
UserController.sendVerificationEmailById = function(id, callback) {
  User.findOne(
    {
      _id: id,
      verified: false
    },
    function(err, user){
      if (err || !user){
        return callback(err);
      }
      var token = user.generateEmailVerificationToken();
      Mailer.sendVerificationEmail(user.email, token);
      return callback(err, user);
  });
};

/**
 * Password reset email
 * @param  {[type]}   email    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
UserController.sendPasswordResetEmail = function(email, callback){
  User
    .findOneByEmail(email)
    .exec(function(err, user){
      if (err) {
        return callback(err);
      }
      if (!user) {
        return callback({ message: 'No account exists with that email' });
      }

      const token = user.generateTempAuthToken();
      Mailer.sendPasswordResetEmail(email, token, callback);
    });
};

/**
 * Reset a user's password to a given password, given a authentication token.
 * @param  {String}   token       Authentication token
 * @param  {String}   password    New Password
 * @param  {Function} callback    args(err, user)
 */
UserController.resetPassword = function(token, password, callback){
  if (!password || !token) {
    return callback({
      message: 'Bad arguments'
    });
  }

  if (password.length < 6) {
    return callback({
      message: 'Password must be 6 or more characters.'
    });
  }

  User.verifyTempAuthToken(token, function(err, id) {
    if (err || !id) {
      return callback(err);
    }

    User
      .findOneAndUpdate({
        _id: id
      }, {
        $set: {
          password: User.generateHash(password)
        }
      }, function(err, user){
        if (err || !user){
          return callback(err);
        }

        Mailer.sendPasswordChangedEmail(user.email);
        return callback(null, {
          message: 'Password successfully reset!'
        });
      });
  });
};

/**
 * [ADMIN ONLY]
 *
 * Admit a user.
 * @param  {String}   userId   User id of the admit
 * @param  {String}   user     User doing the admitting
 * @param  {Function} callback args(err, user)
 */
UserController.admitUser = function(id, user, callback){
  Settings.getRegistrationTimes(function(err, times){
    User
      .findOneAndUpdate({
        _id: id,
        verified: true
      },{
        $set: {
          'status.admitted': true,
          'status.admittedBy': user.email,
          'status.confirmBy': times.timeConfirm
        }
      }, {
        new: true
      },
      callback);
  });
};

/**
 * [ADMIN ONLY]
 *
 * Check in a user.
 * @param  {String}   userId   User id of the user getting checked in.
 * @param  {String}   user     User checking in this person.
 * @param  {Function} callback args(err, user)
 */
UserController.checkInById = function(id, user, callback){
  User.findOneAndUpdate({
    _id: id,
    verified: true
  },{
    $set: {
      'status.checkedIn': true,
      'status.checkInTime': Date.now()
    }
  }, {
    new: true
  },
  callback);
};

/**
 * [ADMIN ONLY]
 *
 * Check out a user.
 * @param  {String}   userId   User id of the user getting checked out.
 * @param  {String}   user     User checking out this person.
 * @param  {Function} callback args(err, user)
 */
UserController.checkOutById = function(id, user, callback) {
  User.findOneAndUpdate({
    _id: id,
    verified: true
  },{
    $set: {
      'status.checkedIn': false
    }
  }, {
    new: true
  },
  callback);
};

/**
 * [ADMIN ONLY]
 */
UserController.getStats = function(callback){
  return callback(null, Stats.getUserStats());
};

module.exports = UserController;
