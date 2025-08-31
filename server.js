import mongoose from 'mongoose'

import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'

import User from './models/user.js'

import bcrypt from 'bcrypt'

import path from 'path'

import session from 'express-session'

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { error } from 'console'

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


// Creating session

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))


// Serving static files

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname); // This will output the directory path of the current module
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'views')))

app.use(express.urlencoded({extended: false}))


// Handling get requests

app.get('/', isAuthenticated, (req, res) => {

    res.render('index.ejs')
})

app.get('/signin', isNotAuthenticated, (req, res) => {
    res.render('signin.ejs')

})

app.get('/signup', isNotAuthenticated, (req, res) => {
    res.render('signup.ejs')

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// Handling post requests

app.post('/register', async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10)

  const newUser = new User({
    name: req.body.name,
    email_id: req.body.email,
    sch_id: req.body.schId,
    password: hashPassword,
  })

  await newUser.save()

  res.redirect("/signin")
})

app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({email_id: req.body.email})
    const password = req.body.password
    bcrypt.compare(password, user.password, (error, result) => {
      if (error) {
        res.redirect('/signin')
      } else if (result) {
        req.session.isLoggedIn = true
        res.redirect('/')
      }
      else {
        res.redirect('/signin')
      }
    })

  } catch (error) {
    console.log(error)
  }
})

// Function for authentication

function isAuthenticated(req, res, next) {
  if (req.session.isLoggedIn) {
    next()  
  } else {
    res.redirect('/signup')
  }
}

function isNotAuthenticated(req, res, next) {
  if (req.session.isLoggedIn) {
    res.redirect('/')  
  } else {
    next()
  }
}