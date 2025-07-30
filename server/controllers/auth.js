const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require('express').Router()
const User = require('../models/User')

// User will first register route

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user already exist
    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    })

    const saveUser = await user.save()
    res.status(201).json(saveUser)
  }
  catch (error) {
    res.status(500).json(error)
  }
})

// User Login Route

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exist
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // compare the passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Generate JWT token
    const userforToken = {
      fullName: user.fullName,
      email: user.email,
      id: user._id
    }

    const token = jwt.sign(
      userforToken,
      process.env.SECRET,
      { expiresIn: 60 * 60 }
    )
    res.status(200).send({
      token, user: {
        fullName: user.fullName,
        email: user.email
      }
    })
  } catch (error) {
    console.error("Registration error:", error.message)
    res.status(500).json({ message: error.message || "Internal server error" })
  }
})
module.exports = router;
