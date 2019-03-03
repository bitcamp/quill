const express = require('express');
const EventController = require('../../controllers/EventController');
const { isAdmin } = require('./util');

const router = express.Router({mergeParams: true});

router.get('/', async (req, res) => {
  try {
    const events = await EventController.getAll();
    res.json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const event = await EventController.getById(id);
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
    const newEvent = await EventController.createEvent(event);
    res.json(newEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch('/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  const partialEvent = req.body;

  try {
    const updatedEvent = await EventController.updateEventById(id, partialEvent);
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.delete('/:id', isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await EventController.deleteEventById(id);
    if (deletedEvent) {
      res.json(deletedEvent);
    } else {
      res.status(404).json({ 'message': 'could not find event to delete' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;