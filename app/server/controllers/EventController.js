const Event = require('../models/Event');
const User = require('../models/User');

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

  async favoriteEventByFirebaseId(userId, firebaseId) {
    const user = await User.findById(userId).exec();
    if (!user) {
      console.log("User not found");
      throw Error("User not found");
    }

    let event = await Event.findOne({firebaseId});
    if (!event) {
      console.log("Firebase event does not already exist, creating it");
      event = new Event({firebaseId});
      await event.save();
    }

    if (user.hasFavoritedEvent(event.id)) {
      console.log("Already favorited");
      throw Error("You have already favorited this event");
    }
    
    await User.
      updateOne(
        {_id: userId},
        {$push: {favoritedEvents: event.id}}
      )
      .exec();
    
    await Event
      .findOneAndUpdate(
        {_id: event.id},
        {$inc: {'numFavorited': 1}},
      )
      .exec();
    
    return {
      user: await User.findById(userId),
      event: await Event.findById(event.id),
    }
  }

  async unfavoriteEventByFirebaseId(userId, firebaseId) {
    const user = await User.findById(userId).exec();
    if (!user) {
      console.log("User not found");
      throw Error("User not found");
    }

    let event = await Event.findOne({firebaseId});
    if (!event) {
      console.log("Firebase event does not already exist, creating it");
      event = new Event({firebaseId});
      await event.save();
    }

    if (!user.hasFavoritedEvent(event.id)) {
      console.log("Already favorited");
      throw Error("You have not already favorited this event");
    }
    
    await User.
      updateOne(
        {_id: userId},
        {$pull: {favoritedEvents: event.id}}
      )
      .exec();
    
    await Event
      .findOneAndUpdate(
        {_id: event.id},
        {$inc: {'numFavorited': -1}},
      )
      .exec();
    
    return {
      user: await User.findById(userId),
      event: await Event.findById(event.id),
    }
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