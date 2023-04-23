const express = require('express');
const router = express.Router();
const User = require('../schema');

router.get('/top-cities', async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
          totalIncome: {
            $sum: {
              $toDouble: {
                $replaceOne: {
                  input: "$income",
                  find: "$",
                  replacement: ""
                }
              }
            }
          }
        }
      },
      {
        $match: {
          _id: { $ne: null, $ne: "" },
          count: { $gt: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          city: "$_id",
          count: 1,
          averageIncome: {
            $round: [
              {
                $divide: [
                  {
                    $sum: {
                      $cond: [
                        {
                          $regexMatch: {
                            input: "$email",
                            regex: /[0-9]/
                          }
                        },
                        0,
                        { $toDouble: { $substrCP: ["$income", 1, -1] } }
                      ]
                    }
                  },
                  "$count"
                ]
              },
              2
            ]
          }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
