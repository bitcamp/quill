require('dotenv').load({silent: true});
const fs = require('fs');
const path = require('path');
const User = require('../models/User');

const mongoose        = require('mongoose');
const database        = process.env.DATABASE || process.env.MONGODB_URI || "mongodb://localhost:27017";
mongoose.connect(database);

const filePath = path.join(__dirname, 'emailsWithReimbursements.txt');
const lines = fs
  .readFileSync(filePath)
  .toString()
  .split('\n')
  .map(line => line.trim().split(' '));

console.log(lines);

const applyTravelReimbursements = async () => {
  let numErrors = 0;

  lines.forEach(async (line) => {
    const email = line[0];
    const reimbursementLimit = line[1];

    try {
      const user = await User
        .findOneByEmail(email)
        .exec();
      user.reimbursementLimit = reimbursementLimit;
      await user.save();
    } catch (err) {
      console.log(err);
      numErrors += 1;
    }
  });

  console.log('Done applying travel reimbursements');
  console.log(`Num Errors: ${numErrors}`);
}

applyTravelReimbursements();