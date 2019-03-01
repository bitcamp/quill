const mongoose   = require('mongoose'),
      bcrypt     = require('bcrypt-nodejs'),
      validator  = require('validator'),
      jwt        = require('jsonwebtoken'),
      crypto     = require('crypto'),
      JWT_SECRET = process.env.JWT_SECRET;

const profile = {
  // Personal Info
  firstName: {
    type: String,
    min: 1,
    max: 100,
  },
  lastName: {
    type: String,
    min: 1,
    max: 100,
  },
  gender: {
    type: String,
    enum : {
      values: 'M F N O P'.split(' ')
    }
  },
  phoneNumber: String,
  adult: {
    type: Boolean,
    required: true,
    default: false,
  },
  shirtSize: {
    type: String,
    enum: {
      values: 'XS S M L XL XXL'.split(' ')
    }
  },
  organization: {
    type: String,
    min: 1,
    max: 1000,
  },

  // emergency contact
  emergencyContact: {
    name: String,
    relationship: {
      type: String,
      min: 1,
      max: 100,
    },
    cellNumber: String,
    workNumber: String,
  },

  // School Information
  school: {
    type: String,
    min: 1,
    max: 150,
  },
  schoolYear: {
    type: String,
    enum: {
      values: 'High-School Freshman Sophomore Junior Senior Grad-Student Graduated'.split(' '),
    }
  },
  major: {
    type: String,
    min: 1,
    max: 100,
  },
  minor: {
    type: String,
    min: 1,
    max: 100,
  },

  // Additional Logistics
  dietaryRestrictions: [String],
  needsReimbursement: Boolean,
  reimbursementOrigin: {
    type: String,
    min: 0,
    max: 150
  },

  //Bitcamp
  amtHackathons: {
    type: String,
    enum: {
      values: '0 1-5 6+'.split(' '),
    }
  },
  whyBitcamp: {
    type: String,
    min: 0,
    max: 250
  },
  buildBitcamp: {
    type: String,
    min: 0,
    max: 1000
  },
  workshops: [String],

  // Professional
  // resume uses dropbox form
  interestedIn: {
    type: String,
    enum: {
      values: 'Internship Full-Time None'.split(' '),
    }
  },
  github: {
    type: String,
    min: 0,
    max: 100
  },
  devpost: {
    type: String,
    min: 0,
    max: 100
  },
  website: {
    type: String,
    min: 0,
    max: 100
  },

  //Legal
  mlhCOC: { //code of conduct
    type: Boolean,
    required: true,
    default: false,
  },
  mlhTAC: { //terms and conditions
    type: Boolean,
    required: true,
    default: false,
  },
  bitcampWaiver: {
    type: Boolean,
    required: true,
    default: false,
  },

  // Additional
  additional: {
    type: String,
    min: 0,
    max: 1000,
  }
};

// Only after confirmed
var confirmation = {
  interestedTrails: Boolean,
  trailChoice: {
    type: String,
    enum: {
      values: 'Design Venture Scout'.split(' '),
    },
  },
  confirmationAdditional: {
    type: String,
    min: 0,
    max: 1000,
  },
};

var status = {
  /**
   * Whether or not the user's profile has been completed.
   * @type {Object}
   */
  completedProfile: {
    type: Boolean,
    required: true,
    default: false,
  },
  admitted: {
    type: Boolean,
    required: true,
    default: false,
  },
  admittedBy: {
    type: String,
    validate: [
      validator.isEmail,
      'Invalid Email',
    ],
    select: false
  },
  confirmed: {
    type: Boolean,
    required: true,
    default: false,
  },
  declined: {
    type: Boolean,
    required: true,
    default: false,
  },
  waitlisted: {
    type: Boolean,
    required: true,
    default: false,
  },
  didNotConfirm: {
    type: Boolean,
    required: true,
    default: false,
  },
  checkedIn: {
    type: Boolean,
    required: true,
    default: false,
  },
  checkInTime: {
    type: Number,
  },
  confirmBy: {
    type: Number
  },
  reimbursementGiven: {
    type: Boolean,
    default: false
  }
};

// define the schema for our admin model
let schema = new mongoose.Schema({
  email: {
      type: String,
      required: true,
      validate: [
        validator.isEmail,
        'Invalid Email',
      ]
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  timestamp: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  lastUpdated: {
    type: Number,
    default: Date.now(),
  },
  firstSubmitted: {
    type: Number,
    default: 32503680000000.0, // Jan 1, 3000 (way in the future because it's tricky to use null or undefined)
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  salt: {
    type: Number,
    required: true,
    default: Date.now(),
    select: false
  },

  /**
   * User Profile.
   *
   * This is the only part of the user that the user can edit.
   * Profile validation will exist here.
   */
  profile: profile,

  /**
   * Confirmation information
   * Extension of the user profile, but can only be edited after acceptance.
   */
  confirmation: confirmation,

  status: status,

  /**
   * Passwordless login
   * Code and Expiration time
   */
  loginCode: {
    type: String,
    required: false,
    default: null,
  },

  loginCodeExpiration: {
    type: Number,
    required: false,
    default: Date.now(),
  }
});

schema.set('toJSON', {
  virtuals: true
});

schema.set('toObject', {
  virtuals: true
});

//=========================================
// Instance Methods
//=========================================

// checking if this password matches
schema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Token stuff
schema.methods.generateEmailVerificationToken = function(){
  return jwt.sign(this.email, JWT_SECRET);
};

schema.methods.generateAuthToken = function(){
  return jwt.sign(this._id, JWT_SECRET);
};

// Generate temp login code
schema.methods.generateTempCode = function() {
  return crypto.randomBytes(4).toString("hex");
}

// Validate temp login code
schema.methods.checkTempCode = function(code) {
  if(this.loginCodeExpiration > Date.now()) {
    return this.loginCode === code;
  } else {
    return false;
  }
}

/**
 * Generate a temporary authentication token (for changing passwords)
 * @return JWT
 * payload: {
 *   id: userId
 *   iat: issued at ms
 *   exp: expiration ms
 * }
 */
schema.methods.generateTempAuthToken = function(){
  return jwt.sign({
    id: this._id
  }, JWT_SECRET, {
    expiresInMinutes: 60,
  });
};

//=========================================
// Static Methods
//=========================================
schema.statics.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Verify an an email verification token.
 * @param  {[type]}   token token
 * @param  {Function} cb    args(err, email)
 */
schema.statics.verifyEmailVerificationToken = function(token, callback){
  jwt.verify(token, JWT_SECRET, function(err, email){
    return callback(err, email);
  });
};

/**
 * Verify a temporary authentication token.
 * @param  {[type]}   token    temporary auth token
 * @param  {Function} callback args(err, id)
 */
schema.statics.verifyTempAuthToken = function(token, callback){
  jwt.verify(token, JWT_SECRET, function(err, payload){

    if (err || !payload){
      return callback(err);
    }

    if (!payload.exp || Date.now() >= payload.exp * 1000){
      return callback({
        message: 'Token has expired.'
      });
    }

    return callback(null, payload.id);
  });
};

schema.statics.findOneByEmail = function(email){
  return this.findOne({
    email: email.toLowerCase()
  });
};

/**
 * Get a single user using a signed token.
 * @param  {String}   token    User's authentication token.
 * @param  {Function} callback args(err, user)
 */
schema.statics.getByToken = function(token, callback){
  jwt.verify(token, JWT_SECRET, function(err, id){
    if (err) {
      return callback(err);
    }
    this.findOne({_id: id}, callback);
  }.bind(this));
};

schema.statics.validateProfile = function(profile, cb){
  return cb(!(
    profile.firstName.length > 0 &&
    profile.lastName.length > 0 &&
    profile.adult &&
    profile.school.length > 0 &&
    ['High-School', 'Freshman', 'Sophomore', 'Junior', 'Senior', 'Grad-Student', 'Graduated'].indexOf(profile.schoolYear) > -1 &&
    ['M', 'F', 'N', 'P', 'O'].indexOf(profile.gender) > -1
    ));
};

//=========================================
// Virtuals
//=========================================

/**
 * Has the user completed their profile?
 * This provides a verbose explanation of their furthest state.
 */
schema.virtual('status.name').get(function(){
  if (this.status.checkedIn) {
    return 'checked in';
  }

  if (this.status.didNotConfirm) {
    return "waitlist";
  }

  if (this.status.declined) {
    return "declined";
  }

  if (this.status.confirmed) {
    return "confirmed";
  }

  if (this.status.admitted) {
    return "admitted";
  }

  if (this.status.completedProfile){
    return "submitted";
  }

  if (!this.verified){
    return "unverified";
  }

  return "incomplete";
});

module.exports = mongoose.model('User', schema);
