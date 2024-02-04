const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const { getResourceById } = require('../db/queries/getResourceById');
const { rateResourceById } = require('../db/queries/rateResourceById');
router.use(cookieSession({
  name: 'session',
  keys: ["somelongsecretkey987654321"],
}));

router.get('/:id', (req, res) => {
  const resourceId = req.params.id;
  getResourceById(resourceId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/:id', (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    return res.status(403).send("You need to be logged in to perform this action\n");
  }
  const resourceId = req.params.id;
  const userRating = parseFloat(req.body.rateOption);
  if (userRating) {
    getResourceById(resourceId)
      .then(data => {
        const currentRating = parseFloat(data[0].rating);
        const avgRating = (currentRating + userRating) / 2;
        rateResourceById(resourceId, avgRating)
          .then(data => {
            res.json(data);
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  }
});

module.exports = router;
