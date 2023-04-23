const express = require('express');
const router = express.Router();
const User = require('../schema');

router.get('/car-email', async (req, res) => {
  try {
    const users = await User.find({
      car: { $in: ['BMW', 'Mercedes', 'Audi'] },
      email: { $not: /\d/ }
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
