const express = require('express');
const router = express.Router();
const User = require('../schema');

router.get('/', async (req, res) => {
  const firstName = req.query.first_name;
  console.log(`Searching for user with first name ${firstName}`);
  try {
    const user = await User.findOne({ first_name: firstName });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;