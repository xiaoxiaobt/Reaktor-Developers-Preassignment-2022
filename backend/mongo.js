const mongoose = require('mongoose')
require('dotenv').config()
import Result from './models/result'

// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }

const DBNAME = 'reaktor'
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD

const url =
  `mongodb+srv://fullstack:${MONGODB_PASSWORD}@cluster0.7t0bb.mongodb.net/${DBNAME}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Result({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
else {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}