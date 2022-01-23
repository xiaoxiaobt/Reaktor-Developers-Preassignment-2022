const resultsRouter = require('express').Router()
const Result = require('../models/result')
// const User = require('../models/user')


resultsRouter.get('/', async (request, response) => {
  const results = await Result.find({}).populate('results', { playerA: 1, playerB: 1, t: 1 })
  response.json(results)
})

// resultsRouter.post('/', async (request, response) => {
//   const body = request.body


//   const user = {}
//   // await User.findById(decodedToken.id)

//   const blog = new Result({
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//     user: user._id,
//     comments: []
//   })

//   const savedResult = await blog.save()

//   user.blogs = user.blogs.concat(savedResult._id)
//   await user.save()
//   const populatedSavedResult = await Result.findById(savedResult._id).populate('user', { username: 1, name: 1 })

//   response.json(populatedSavedResult.toJSON())
// })

// resultsRouter.post('/:id/comments', async (request, response, next) => {
//   const body = request.body
//   const blog = await Result.findById(request.params.id)
//   if (!blog)
//     return response.status(401).json({ error: 'the blog with specified id cannot be found' })
//   const newResult = {
//     title: blog.title,
//     author: blog.author,
//     url: blog.url,
//     likes: blog.likes,
//     user: blog.user,
//     comments: [...blog.comments, body.comment]
//   }
//   Result.findByIdAndUpdate(request.params.id, newResult, { new: true }).populate('user', { username: 1, name: 1 })
//     .then(updatedResult => {
//       response.json(updatedResult.toJSON())
//     })
//     .catch(error => next(error))
// })


// resultsRouter.delete('/:id', async (request, response) => {
//   const blog = await Result.findById(request.params.id)
//   const decodedToken = {}
//   if (!request.token || !decodedToken.id)
//     return response.status(401).json({ error: 'token missing or invalid' })
//   else if (!blog)
//     return response.status(401).json({ error: 'the blog with specified id cannot be found' })

//   const user = {}

//   if (blog.user.toString() === user._id.toString()) {
//     await Result.findByIdAndRemove(request.params.id)
//     return response.status(204).end()
//   } else
//     return response.status(401).json({ error: 'current user does not have permission to delete' })
// })

// resultsRouter.put('/:id', async (request, response, next) => {
//   const body = request.body

//   const blog = {
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//     user: body.user,
//     comments: body.comments
//   }

//   Result.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
//     .then(updatedResult => {
//       response.json(updatedResult.toJSON())
//     })
//     .catch(error => next(error))
// })

module.exports = resultsRouter