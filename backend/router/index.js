// ./routes/index.js
const fighters = require('./fighters')

module.exports = app => {
  app.use('/fighters', fighters)
  // etc..
}