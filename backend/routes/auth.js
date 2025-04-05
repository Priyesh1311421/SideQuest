const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // adjust this path if needed
const Room = require('../models/Room');
const authController = require('../controllers/authController');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'shivesh';

// Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ email, password }); 

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    res.status(201).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: error});
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/rooms', authController, async (req, res) => {
    try {
      const rooms = await Room.find();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
