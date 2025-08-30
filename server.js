import mongoose from 'mongoose'

import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()
const port = process.env.PORT
const connectionString = process.env.connection_string

// Database Connection
async function connectToMongoDB() {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB Atlas!");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}

connectToMongoDB();


// Serving static files

app.use(express.static('public'))
app.use(express.static('views'))

app.get('/', (req, res) => {
  // res.render('index.ejs')
  res.render('signup.ejs')
})

app.get('/signin', (req, res) => {
  // res.render('index.ejs')
  res.render('signin.ejs')
})

app.get('/signup', (req, res) => {
  // res.render('index.ejs')
  res.render('signup.ejs')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
