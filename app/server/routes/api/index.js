const usersRouter = require('./users');
const settingsRouter = require('./settings');
const eventsRouter = require('./events');
const firebaseEventsRouter = require('./firebaseEvents');

module.exports = function(router) {
  router.use('/users', usersRouter);
  router.use('/settings', settingsRouter);
  router.use('/events', eventsRouter);
  router.use('/firebaseEvents', firebaseEventsRouter);
};
