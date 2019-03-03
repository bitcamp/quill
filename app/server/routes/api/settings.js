const express = require('express');
const SettingsController = require('../../controllers/SettingsController');
const {
  isAdmin,
  defaultResponse
} = require('./util');

const router = express.Router({
  mergeParams: true,
});

/**
 * Get the public settings.
 * res: {
 *   timeOpen: Number,
 *   timeClose: Number,
 *   timeToConfirm: Number,
 *   acceptanceText: String,
 *   confirmationText: String,
 *   allowMinors: Boolean
 * }
 */
router.get('/', (req, res) => {
  SettingsController.getPublicSettings(defaultResponse(req, res));
});

/**
 * Update the acceptance text.
 * body: {
 *   text: String
 * }
 */
router.put('/waitlist', isAdmin, (req, res) => {
  var text = req.body.text;
  SettingsController.updateField('waitlistText', text, defaultResponse(req, res));
});

/**
 * Update the acceptance text.
 * body: {
 *   text: String
 * }
 */
router.put('/acceptance', isAdmin, (req, res) => {
  var text = req.body.text;
  SettingsController.updateField('acceptanceText', text, defaultResponse(req, res));
});

/**
 * Update the confirmation text.
 * body: {
 *   text: String
 * }
 */
router.put('/confirmation', isAdmin, (req, res) => {
  var text = req.body.text;
  SettingsController.updateField('confirmationText', text, defaultResponse(req, res));
});

/**
 * Update the confirmation date.
 * body: {
 *   time: Number
 * }
 */
router.put('/confirm-by', isAdmin, (req, res) => {
  var time = req.body.time;
  SettingsController.updateField('timeConfirm', time, defaultResponse(req, res));
});

/**
 * Set the registration open and close times.
 * body : {
 *   timeOpen: Number,
 *   timeClose: Number
 * }
 */
router.put('/times', isAdmin, (req, res) => {
  var open = req.body.timeOpen;
  var close = req.body.timeClose;
  SettingsController.updateRegistrationTimes(open, close, defaultResponse(req, res));
});

/**
 * [ADMIN ONLY]
 * {
 *   allowMinors: Boolean
 * }
 * res: Settings
 *
 */
router.put('/minors', isAdmin, (req, res) => {
  const allowMinors = req.body.allowMinors;
  SettingsController.updateField('allowMinors', allowMinors, defaultResponse(req, res));
});

module.exports = router;