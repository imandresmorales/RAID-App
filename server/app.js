require('dotenv').config()
const express = require('express')
const app = express()

// Middleware to parse JSON requests
app.use(express.json())
const cors = require('cors')

app.use(cors())

// Registered Routes
const authRoutes = require('./controllers/auth')

// Mongoose for DB connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


app.get('/', (req, res) => {
  res.send("Backend is running")
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})

app.use("/api/auth", authRoutes)

module.exports = app