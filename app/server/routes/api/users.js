const express = require('express');
const UserController = require('../../controllers/UserController');
const FirebaseEventController = require('../../controllers/FirebaseEventController');
const { isAdmin,  isOwnerOrAdmin, defaultResponse } = require('./util');

const router = express.Router({mergeParams: true});

/**
 * [ADMIN ONLY]
 *
 * GET - Get all users, or a page at a time.
 * ex. Paginate with ?page=0&size=100
 */
router.get('/', isAdmin, (req, res) => {
  const query = req.query;

  if (query.page && query.size) {
    UserController.getPage(query, defaultResponse(req, res));
  } else {
    UserController.getAll(defaultResponse(req, res));
  }
});

/**
 * [ADMIN ONLY]
 */
router.get('/stats', isAdmin, (req, res) => {
  UserController.getStats(defaultResponse(req, res));
});

/**
 * [OWNER/ADMIN]
 *
 * GET - Get a specific user.
 */
router.get('/:id', isOwnerOrAdmin, (req, res) => {
  const id = req.params.id;

  UserController.getById(id, defaultResponse(req, res));
});

/**
 * [OWNER/ADMIN]
 *
 * PUT - Update a specific user's profile.
 */
router.put('/:id/profile', isOwnerOrAdmin, function (req, res) {
  const profile = req.body.profile;
  const id = req.params.id;

  UserController.updateProfileById(id, profile, defaultResponse(req, res));
});

/**
 * [OWNER/ADMIN]
 *
 * PUT - Update a specific user's confirmation information.
 */
router.put('/:id/confirm', isOwnerOrAdmin, (req, res) => {
  const confirmation = req.body.confirmation;
  const id = req.params.id;

  UserController.updateConfirmationById(id, confirmation, defaultResponse(req, res));
});

/**
 * [OWNER/ADMIN]
 *
 * POST - Decline an acceptance.
 */
router.post('/:id/decline', isOwnerOrAdmin, function (req, res) {
  const id = req.params.id;

  UserController.declineById(id, defaultResponse(req, res));
});

/**
 * [OWNER/ADMIN]
 *
 * POST - Favorite an event
 */
router.post('/:id/favoriteEvent/:eventId', isOwnerOrAdmin, function(req, res) {
  const id = req.params.id;
  const eventId = req.params.eventId;

  UserController.favoriteEvent(id, eventId, defaultResponse(req, res));
});

/**
 * [OWNER/ADMIN]
 *
 * POST - Unfavorite an event
 */
router.post('/:id/unfavoriteEvent/:eventId', isOwnerOrAdmin, function(req, res) {
  const id = req.params.id;
  const eventId = req.params.eventId;

  UserController.unfavoriteEvent(id, eventId, defaultResponse(req, res));
});

router.post('/:id/favoriteFirebaseEvent/:firebaseId', isOwnerOrAdmin, async function(req, res) {
  const userId = req.params.id;
  const firebaseId = req.params.firebaseId;

  try {
    const response = await FirebaseEventController
      .favoriteByFirebaseId(userId, firebaseId);
    res.json(response);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.post('/:id/unfavoriteFirebaseEvent/:firebaseId', isOwnerOrAdmin, async function(req, res) {
  const userId = req.params.id;
  const firebaseId = req.params.firebaseId;

  try {
    const response = await FirebaseEventController
      .unfavoriteByFirebaseId(userId, firebaseId);
    res.json(response);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

/**
 * Admit a user. ADMIN ONLY, DUH
 *
 * Also attaches the user who did the admitting, for liabaility.
 */
router.post('/:id/admit', isAdmin, function (req, res) {
  const id = req.params.id;
  const user = req.user;

  UserController.admitUser(id, user, defaultResponse(req, res));
});

/**
 * Check in a user. ADMIN ONLY, DUH
 */
router.post('/:id/checkin', isAdmin, function (req, res) {
  const id = req.params.id;
  const user = req.user;

  UserController.checkInById(id, user, defaultResponse(req, res));
});

/**
 * Check in a user. ADMIN ONLY, DUH
 */
router.post('/:id/checkout', isAdmin, function (req, res) {
  const id = req.params.id;
  const user = req.user;

  UserController.checkOutById(id, user, defaultResponse(req, res));
});

module.exports = router;
