// Create a default admin user.
const User = require('../models/User');

ADMIN_EMAIL = process.env.ADMIN_EMAIL;
ADMIN_PASSWORD = process.env.ADMIN_PASS;

const adminUserQuery = {email: ADMIN_EMAIL};
const createAdminUser = (_, user) => {
  if (!user){
    let u = new User();
    u.email = ADMIN_EMAIL;
    u.password = User.generateHash(ADMIN_PASSWORD);
    u.admin = true;
    u.verified = true;
    u.save(function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
}

User
  .findOne(adminUserQuery)
  .exec(createAdminUser);
