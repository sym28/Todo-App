require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const todoRoutes = require('./routes/todos')

const app = express()

// middleware to parse req from client
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


// routes
app.use('/api/todos', todoRoutes)

// database connection
mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
  // listen for requests
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
  })

}).catch((error) => {
  console.log('error: ', error)
})