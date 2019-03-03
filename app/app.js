// Load the dotfiles.
require('dotenv').load({silent: true});

// Application and Middleware
const express         = require('express');
const bodyParser      = require('body-parser');
const methodOverride  = require('method-override');
const morgan          = require('morgan');

// Database
const mongoose        = require('mongoose');
const port            = process.env.PORT || 3001;
const database        = process.env.DATABASE || process.env.MONGODB_URI || "mongodb://localhost:27017";

// Create default admin user and settings on first startup
const settingsConfig  = require('./server/config/settings');
const adminConfig     = require('./server/config/admin');
const eventConfig     = require('./server/config/events');

// Create the app and apply middleware
const app             = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

// Connect to mongodb
mongoose.connect(database);

app.use(express.static(__dirname + '/client'));

// Enable CORS =================================================================
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, PUT, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept, X-Access-Token"
  );
  next();
});

// Routers =====================================================================
const apiRouter = express.Router();
require('./server/routes/api')(apiRouter);
app.use('/api', apiRouter);

const authRouter = express.Router();
require('./server/routes/auth')(authRouter);
app.use('/auth', authRouter);

require('./server/routes')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
