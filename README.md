# Bitcamp Registration
Bitcamp's Registration App is a hardfork of the quill registration system developed by the hackers at TechX at MIT.

# Features for User
### Dashboard
After users login, the Dashboard displays the user’s application status and status-specific prompts to resend a verification email, view/edit their application or confirmation forms.

Statuses:
- Unverified: users have not verified the email address they registered with
- Incomplete, registration open: the user has not submitted their application, but the registration deadline has not passed
- Incomplete, registration closed: the user has not submitted, but the registration deadline has passed
- Submitted, registration open
- Submitted, registration closed
- Admitted / unconfirmed: the user has been admitted to the event, but has not confirmed their attendance and submitted their confirmation form
- Admitted / confirmation deadline passed: the user has been admitted, but did not confirm their attendance before the deadline
- Waitlisted: the user was not admitted to the event
- Confirmed: the user has been admitted and has confirmed their attendance
- User declined admission: the user has been admitted, but will not be attending the event

### Application
The Application tab takes users to their registration or confirmation form. 

# Features for Admins
Admins can view stats, look through applications, or edit settings from the Admin panel.

### Stats
The Stats tab summarizes useful registration statistics on the number of users in each stage of the process, demographic information, and miscellaneous event preferences like shirt sizes, dietary restrictions, or reimbursement requests.

### Users Table
The Users tab displays a table of users where admins can:
1. Search for a user by name
2. Quick-view user applications in a pop-up modal
3. See a user’s application status (verified, submitted, admitted, and confirmed) at-a-glance
4. See responses to other miscellaneous fields on the application
5. Open and edit an individual application
6. Admit users manually
7.  Mark users as checked-in at the event day-of

### Settings 
On the Settings tab, admins can easily control their event application timeline by setting registration / confirmation deadlines. They can also write custom waitlist, acceptance, and confirmation copy that users will see on their dashboard throughout the application process. The custom copy is interpreted as Markdown, so HTML and images can be added.

# Setup
The registration portal is designed to be deployed both locally and in production with Docker.

### Deploying for local development
#### Server instructions
* cd into `./app` and run `npm run config` to create a new .env file, or just run `cp .env.config .env`
* In your .env file, set the database URI to `DATABASE='mongodb:27017'`

#### Client instructions
* cd into `./client` and follow the README instructions there

#### Entire Application instructions
To use the docker-compose, just run the following:
* Install docker and docker-compose
* cd back into the root directory
* Run `docker-compose up`, which will spin up an instance of mongodb and run the server
    - Linux users might need to run docker with sudo

### Deploying for production
* Create a docker-compose.override.yml file
* In the override file, add the environment variables `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD`
  to the mongodb service and update the database URI to `<username>:<password>@mongodb:27017` in .env
* In the override file, add the port mapping `80:3000` to the quill service

# Customizing for your event
### Application Text
If you’d like to customize the text that users see on their dashboards, edit them at `client/src/constants.js`.

### Branding / Assets
Customize the color scheme and hosted assets by editing `client/stylesheets/_custom.scss`. Don’t forget to use your own email banner, favicon, and logo (color/white) in the `assets/images/` folder as well! 

### Application questions
If you want to change the application questions, edit:
- `client/views/application/`
- `server/models/User.js`
- `client/views/admin/user/` and `client/views/admin/users/` to render the updated form properly in the admin view

### Statistics
If you want stats for your new fields:
- Recalculate them in `server/services/stats.js`
- Display them on the admin panel by editing `client/views/admin/stats/` 

### Email Templates
To customize the verification and confirmation emails for your event, put your new email templates in `server/templates/` and edit `server/services/email.js`

# License
This repository is a fork of the work of Edwin Zhang.

Copyright (c) 2015-2016 Edwin Zhang (https://github.com/ehzhang). 

Released under AGPLv3. See [`LICENSE.txt`][license] for details.