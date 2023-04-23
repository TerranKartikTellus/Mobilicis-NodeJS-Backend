const express = require('express');
const router = express.Router();
const User = require('../schema');

router.get('/male-phone', async (req, res) => {
  console.log('/male-phone');

  try {
    const users = await User.find({
      gender: 'Male',
      phone_price: { $gt: 10000 }
    });

    if (users.length === 0) {
      return res.status(404).json({ error: 'No male users found with phone price greater than 10,000' });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
