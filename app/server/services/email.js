const path = require('path'),
      nodemailer = require('nodemailer'),
      smtpTransport = require('nodemailer-smtp-transport'),
      templatesDir = path.join(__dirname, '../templates'),
      emailTemplates = require('email-templates'),

      NODE_ENV = process.env.NODE_ENV,

      ROOT_URL = process.env.ROOT_URL,
      HACKATHON_NAME = process.env.HACKATHON_NAME,
      EMAIL_ADDRESS = process.env.EMAIL_ADDRESS,
      TWITTER_HANDLE = process.env.TWITTER_HANDLE,
      FACEBOOK_HANDLE = process.env.FACEBOOK_HANDLE,

      EMAIL_HOST = process.env.EMAIL_HOST,
      EMAIL_USER = process.env.EMAIL_USER,
      EMAIL_PASS = process.env.EMAIL_PASS,
      EMAIL_PORT = process.env.EMAIL_PORT,
      EMAIL_CONTACT = process.env.EMAIL_CONTACT,
      EMAIL_HEADER_IMAGE = process.env.EMAIL_HEADER_IMAGE;

if(EMAIL_HEADER_IMAGE.indexOf("https") == -1){
  EMAIL_HEADER_IMAGE = ROOT_URL + EMAIL_HEADER_IMAGE;
}

const options = {
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
};

const transporter = nodemailer.createTransport(smtpTransport(options));

let controller = {};

controller.transporter = transporter;

function sendOne(templateName, options, data, callback){

  if (NODE_ENV === "dev") {
    console.log(templateName);
    console.log(JSON.stringify(data, "", 2));
  }

  emailTemplates(templatesDir, function(err, template){
    if (err) {
      return callback(err);
    }

    data.emailHeaderImage = EMAIL_HEADER_IMAGE;
    data.emailAddress = EMAIL_ADDRESS;
    data.hackathonName = HACKATHON_NAME;
    data.twitterHandle = TWITTER_HANDLE;
    data.facebookHandle = FACEBOOK_HANDLE;
    template(templateName, data, function(err, html, text){
      if (err) {
        return callback(err);
      }

      transporter.sendMail({
        from: EMAIL_CONTACT,
        to: options.to,
        subject: options.subject,
        html: html,
        text: text
      }, function(err, info){
        if(callback){
          callback(err, info);
        }
      });
    });
  });
}

/**
 * Send a verification email to a user, with a verification token to enter.
 * @param  {[type]}   email    [description]
 * @param  {[type]}   token    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
controller.sendVerificationEmail = function(email, token, callback) {
  const options = {
    to: email,
    subject: "["+HACKATHON_NAME+"] - Verify your email"
  };
  const locals = {
    verifyUrl: ROOT_URL + '/verify/' + token
  };

  sendOne('email-verify', options, locals, function(err, info){
    if (err) {
      console.log(err);
    }
    if (info) {
      console.log(info.message);
    }
    if (callback) {
      callback(err, info);
    }
  });
};

/**
 * Send a password recovery email.
 * @param  {[type]}   email    [description]
 * @param  {[type]}   token    [description]
 * @param  {Function} callback [description]
 */
controller.sendPasswordResetEmail = function(email, token, callback) {
  const options = {
    to: email,
    subject: "["+HACKATHON_NAME+"] - Password reset requested!"
  };
  const locals = {
    title: 'Password Reset Request',
    subtitle: '',
    description: 'Somebody (hopefully you!) has requested that your password be reset. If ' +
      'this was not you, feel free to disregard this email. This link will expire in one hour.',
    actionUrl: ROOT_URL + '/reset/' + token,
    actionName: "Reset Password"
  };

  sendOne('email-link-action', options, locals, function(err, info) {
    if (err) {
      console.log(err);
    }
    if (info) {
      console.log(info.message);
    }
    if (callback) {
      callback(err, info);
    }
  });
};

/**
 * Send a password recovery email.
 * @param  {[type]}   email    [description]
 * @param  {[type]}   token    [description]
 * @param  {Function} callback [description]
 */
controller.sendTempLoginCode = function(email, code, callback) {
  const options = {
    to: email,
    subject: "["+HACKATHON_NAME+"] - Temporary Login Code!"
  };
  const locals = {
    title: 'Temporary Login Code',
    subtitle: '',
    body: 'Somebody (hopefully you!) has requested a temporary login code. If ' +
      'this was not you, feel free to disregard this email. This code will expire in 5 minutes.' +
      'The code is: ' + code,
  };

  sendOne('email-basic', options, locals, function(err, info) {
    if (err) {
      console.log(err);
    }
    if (info) {
      console.log(info.message);
    }
    if (callback) {
      callback(err, info);
    }
  });
};

/**
 * Send a password recovery email.
 * @param  {[type]}   email    [description]
 * @param  {Function} callback [description]
 */
controller.sendPasswordChangedEmail = function(email, callback){
  const options = {
    to: email,
    subject: "["+HACKATHON_NAME+"] - Your password has been changed!"
  };
  const locals = {
    title: 'Password Updated',
    body: 'Somebody (hopefully you!) has successfully changed your password.',
  };

  sendOne('email-basic', options, locals, function(err, info){
    if (err){
      console.log(err);
    }
    if (info){
      console.log(info.message);
    }
    if (callback){
      callback(err, info);
    }
  });
};

module.exports = controller;
