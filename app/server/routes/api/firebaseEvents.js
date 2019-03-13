const express = require('express');
const FirebaseEventController = require('../../controllers/FirebaseEventController');
const { isAdmin } = require('./util');

const router = express.Router({mergeParams: true});

router.get('/', async (req, res) => {
  try {
    const events = await FirebaseEventController.getAll();
    res.json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/favoriteCounts', async (req, res) => {
  try {
    const favorites = await FirebaseEventController.getFavoriteCounts();
    res.json(favorites);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const event = await FirebaseEventController.getById(id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ 'message': 'no event found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', isAdmin, async (req, res) => {
  const event = req.body;

  try {
    const newEvent = await FirebaseEventController.createEvent(event);
    res.json(newEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch('/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  const partialEvent = req.body;

  try {
    const updatedEvent = await FirebaseEventController.updateEventById(id, partialEvent);
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.delete('/:id', isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await FirebaseEventController.deleteEventById(id);
    if (deletedEvent) {
      res.json(deletedEvent);
    } else {
      res.status(404).json({ 'message': 'could not find event to delete' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO: cleanup
router.get('/firebaseFavoriteCounts', async (req, res) => {
  try {
    const favoriteCounts= await FirebaseEventController.getFavoriteCountsByFirebaseId();
    res.json(favoriteCounts);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

module.exports = router;