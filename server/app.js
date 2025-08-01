require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')

// Mongoose for DB connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Registered Routes
const authRoutes = require('./controllers/auth')
const projectRouter = require('./controllers/project')

app.use(cors())
// Middleware to parse JSON requests
app.use(express.json())
app.use(middleware.tokenExtractor)

app.get('/', (req, res) => {
  res.send("Backend is running")
})

app.use("/api/auth", authRoutes)
app.use('/api/projects', middleware.userExtractor, projectRouter)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})


module.exports = app