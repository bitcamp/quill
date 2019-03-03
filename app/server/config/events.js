const Event = require('../models/Event');

const configureDefaultEvent = async () => {
  const existingEvent = await Event
    .findOne({})
    .exec();

  if (!existingEvent) {
    const event = new Event({
      name: 'Default Event',
    });
    try {
      await event.save();
    } catch (e) {
      console.log(e);
    }
  }
};

configureDefaultEvent();