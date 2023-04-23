const express = require('express');
const router = express.Router();
const User = require('../schema');

router.get('/char-len-email', async (req, res) => {
  try {
    const users = await User.aggregate([
  { $match: { last_name: { $regex: /^M/ } } },
  {
    $match: {
      $expr: {
        $and: [
          { $gt: [{ $strLenCP: "$quote" }, 15] },
          { $regexMatch: { input: "$email", regex: new RegExp(req.query.last_name) } }
        ]
      }
    }
  }
]);


    const filteredUsers = users.filter(user => {
      const lastName = user.last_name;
      return user.email.includes(lastName);
    });

    res.json(filteredUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
