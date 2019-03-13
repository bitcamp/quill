const FirebaseEvent = require('../models/FirebaseEvent');
const User = require('../models/User');

class FirebaseEventController {
  async getAll() {
    return await FirebaseEvent.find({}).exec();
  }

  async getById(firebaseId) {
    return await FirebaseEvent.findOne({firebaseId}).exec();
  }

  async getFavoriteCounts() {
    const firebaseEvents = await FirebaseEvent.find({});
    let favorites = {};

    firebaseEvents.forEach(firebaseEvent => {
      favorites[firebaseEvent.firebaseId] = firebaseEvent.numFavorited;
    });

    return favorites;
  }

  async favoriteByFirebaseId(userId, firebaseId) {
    const user = await User.findById(userId).exec();
    if (!user) {
      throw Error("User not found");
    }

    let event = await FirebaseEvent.findOne({firebaseId});
    if (!event) {
      event = new FirebaseEvent({firebaseId});
      await event.save();
    }

    if (user.hasFavoritedFirebaseEvent(event.firebaseId)) {
      throw Error("You have already favorited this event");
    }
    
    await User.
      updateOne(
        {_id: userId},
        {$push: {favoritedFirebaseEvents: event.firebaseId}}
      )
      .exec();
    
    await FirebaseEvent
      .findOneAndUpdate(
        {_id: event.id},
        {$inc: {'numFavorited': 1}},
      )
      .exec();
    
    return {
      user: await User.findById(userId),
      event: await FirebaseEvent.findById(event.id),
    }
  }

  async unfavoriteByFirebaseId(userId, firebaseId) {
    const user = await User.findById(userId).exec();
    if (!user) {
      throw Error("User not found");
    }

    let event = await FirebaseEvent.findOne({firebaseId});
    if (!event) {
      event = new FirebaseEvent({firebaseId});
      await event.save();
    }

    if (!user.hasFavoritedFirebaseEvent(event.firebaseId)) {
      throw Error("You have not already favorited this event");
    }
    
    await User.
      updateOne(
        {_id: userId},
        {$pull: {favoritedFirebaseEvents: event.firebaseId}}
      )
      .exec();
    
    await FirebaseEvent
      .findOneAndUpdate(
        {_id: event.id},
        {$inc: {'numFavorited': -1}},
      )
      .exec();
    
    return {
      user: await User.findById(userId),
      event: await FirebaseEvent.findById(event.id),
    }
  }

  async createEvent(eventData) {
    const newEvent = new FirebaseEvent(eventData);
    return await newEvent
      .save();
  }

  async updateEventById(firebaseId, partialEvent) {
    return await FirebaseEvent
      .findOneAndUpdate({firebaseId}, {
        $set: partialEvent,
      }, {
        new: true,
      })
      .exec();
  }

  async deleteEventById(firebaseId) {
    const existingEvent = await FirebaseEvent.findOne({firebaseId});
    existingEvent.remove();
    return existingEvent;
  }
}

const firebaseEventController = new FirebaseEventController();
module.exports = firebaseEventController;