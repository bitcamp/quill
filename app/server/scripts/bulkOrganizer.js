require('dotenv').load({silent: true});
const fs = require('fs');
const path = require('path');
const User = require('../models/User');

const mongoose = require('mongoose');
const database = process.env.DATABASE || process.env.MONGODB_URI || "mongodb://localhost:27017";
mongoose.connect(database);

const filePath = path.join(__dirname, 'emailsToMakeOrganizer.txt');
const emailAddresses = fs
  .readFileSync(filePath)
  .toString()
  .split('\n')
  .map(line => line.trim());

const findByEmailConditions = {
  email: {
    $in: emailAddresses,
  },
};

const updateQuery = {
  $set: {
    'organizer': true,
  },
};

User
  .updateMany(
    findByEmailConditions,
    updateQuery
  )
  .exec(function(err, result) {
    console.log(err);
    console.log(result);
  });