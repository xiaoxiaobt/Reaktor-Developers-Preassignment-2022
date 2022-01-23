import { Schema, model } from 'mongoose'

const resultSchema = new Schema({
  t: Date,
  author: String,
  url: {
    type: String,
    required: true
  },
  playerA: {
    name: String,
    played: {
      type: String,
      enum : ['ROCK','PAPER','SCISSORS']
    },
  },
  playerB: {
    name: String,
    played: {
      type: String,
      enum : ['ROCK','PAPER','SCISSORS']
    },
  },
  comments: [
    {
      type: String
    }
  ]
})

resultSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model('Result', resultSchema)