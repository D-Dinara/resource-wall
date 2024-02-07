const express = require('express');
const { getRatingByUserId } = require('../db/queries/getRatingByUserId');
const { addRating } = require('../db/queries/addRating');
const { getAvgRatingById } = require('../db/queries/getAvgRatingById');
const { deleteRatingByUserId } = require('../db/queries/deleteRatingByUserId');
const router  = express.Router();

router.post('/:resourceId', (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    return res.status(403).send("You need to be logged in to perform this action\n");
  }
  const resourceId = req.params.resourceId;
  const userRating = req.body.rateOption;
  getRatingByUserId(userId,resourceId)
    .then(data => {
      if (data.length !== 0) {
        return res.json({alreadyRated: true});
      } else {
        addRating(userId, resourceId, userRating)
          .then(data => {
            getAvgRatingById(resourceId)
              .then(data => {
                res.json(data);
              });
          });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.delete('/:resourceId', (req, res) => {
  const resourceId = req.params.resourceId;
  const userId = req.session.user_id;
  deleteRatingByUserId(userId, resourceId)
    .then(data => {
      getAvgRatingById(resourceId)
        .then(data => {
          res.json(data);
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
