// Load the dotfiles.
require('dotenv').load({silent: true});

// Application and Middleware
const express         = require('express');
const bodyParser      = require('body-parser');
const methodOverride  = require('method-override');
const morgan          = require('morgan');

// Database
const mongoose        = require('mongoose');
const port            = process.env.PORT || 3000;
const database        = process.env.DATABASE || process.env.MONGODB_URI || "mongodb://localhost:27017";

// Create default admin user and settings on first startup
const settingsConfig  = require('./app/server/config/settings');
const adminConfig     = require('./app/server/config/admin');

// Create the app and apply middleware
const app             = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

// Connect to mongodb
mongoose.connect(database);

app.use(express.static(__dirname + '/app/client'));

// Routers =====================================================================
const apiRouter = express.Router();
require('./app/server/routes/api')(apiRouter);
app.use('/api', apiRouter);

const authRouter = express.Router();
require('./app/server/routes/auth')(authRouter);
app.use('/auth', authRouter);

require('./app/server/routes')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
