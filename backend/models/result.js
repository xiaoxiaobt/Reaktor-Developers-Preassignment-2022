const config = require('../utils/config')
const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
  t: Date,
  playerA: {
    name: {
      type: String,
      index: true
    },
    played: {
      type: String,
      enum: ['ROCK', 'PAPER', 'SCISSORS']
    }
  },
  playerB: {
    name: {
      type: String,
      index: true
    },
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
  }
})

const Result = mongoose.model('Result', resultSchema)

if (config.NODE_ENV !== 'production') {
  Result.watch().on('change', data => console.log(new Date(), data.fullDocument))
}

module.exports = Result