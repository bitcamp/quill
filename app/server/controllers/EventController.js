const Event = require('../models/Event');

class EventController {
  async getAll() {
    return await Event
      .find({})
      .exec();
  }

  async getById(id) {
    return await Event
      .findById(id)
      .exec();
  }

  async createEvent(eventData) {
    const newEvent = new Event(eventData);
    return await newEvent
      .save();
  }

  async updateEventById(id, partialEvent) {
    return await Event
      .findByIdAndUpdate(id, {
        $set: partialEvent,
      }, {
        new: true,
      })
      .exec();
  }

  async deleteEventById(id) {
    const existingEvent = await Event.findById(id);
    existingEvent.remove();
    return existingEvent;
  }
}

const eventController = new EventController();
module.exports = eventController;