const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
  t: Date,
  playerA: {
    name: String,
    played: {
      type: String,
      enum: ['ROCK', 'PAPER', 'SCISSORS']
    }
  },
  playerB: {
    name: String,
    played: {
      type: String,
      enum: ['ROCK', 'PAPER', 'SCISSORS']
    }
  }
})

resultSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    // delete returnedObject.__v
  }
})

module.exports = mongoose.model('Result', resultSchema)