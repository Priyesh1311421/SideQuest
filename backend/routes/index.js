const express = require('express');
const router = express.Router();
const authenticateClerkUser = require('../controllers/authController');
const User = require('../models/User');
const Room = require('../models/Room');

// 🛡️ Protected Route - Get All Rooms
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 🛡️ Protected Route - Create a Room
router.post('/rooms', authenticateClerkUser, async (req, res) => {
  try {
    const { name, description } = req.body;
    const newRoom = new Room({ name, description });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: 'Error creating room' });
  }
});

module.exports = router;
