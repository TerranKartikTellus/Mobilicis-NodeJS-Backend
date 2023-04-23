const express = require('express');
const router = express.Router();
const User = require('../schema');

router.get('/income-car', async (req, res) => {
  console.log('/users/income-car');
    try {
    const users = await User.find({
      $and: [
        {
          car: {
            $in: ['BMW', 'Mercedes']
          }
        },
        {
          income: {
            $lt: 5
          }
        }
      ]
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
