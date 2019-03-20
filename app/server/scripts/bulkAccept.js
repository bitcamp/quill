require('dotenv').load({silent: true});
const fs = require('fs');
const path = require('path');
const User = require('../models/User');

const mongoose        = require('mongoose');
const database        = process.env.DATABASE || process.env.MONGODB_URI || "mongodb://localhost:27017";
mongoose.connect(database);

const filePath = path.join(__dirname, 'emailsToAccept.txt');
const emailAddresses = fs
  .readFileSync(filePath)
  .toString()
  .split('\n')
  .map(line => line.trim());

const findByEmailConditions = {
  email: {
    $in: emailAddresses,
  },
  'status.completedProfile': true,
}

const updateQuery = {
  $set: {
    'status.admitted': true,
    'status.admittedBy': 'admin@example.com',
    'status.confirmBy': 1583549800453.0,
  }
}

User
  .updateMany(
    findByEmailConditions,
    updateQuery
  )
  .exec(function(err, result) {
    console.log(err);
    console.log(result);
  })