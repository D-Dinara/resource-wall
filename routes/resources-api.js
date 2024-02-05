const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const { getResourceById } = require('../db/queries/getResourceById');
const { rateResourceById } = require('../db/queries/rateResourceById');
const { addResource } = require('../db/queries/addResource');
const { getCategoryByTopic } = require('../db/queries/getCategoryByTopic');
const { getLikesByUserId } = require('../db/queries/getLikesByUserId');
router.use(cookieSession({
  name: 'session',
  keys: ["somelongsecretkey987654321"],
}));

router.get('/:id', (req, res) => {
  const resourceId = req.params.id;
  const userId = req.session.user_id;
  Promise.all([
    getResourceById(resourceId),
    getLikesByUserId(userId, resourceId)
  ])
    .then(([resource, likes]) => {
      const isLiked = likes.length !== 0 ? true : false;
      const responseData = {
        resource: resource,
        userId: userId,
        isLiked: isLiked
      };

      res.json(responseData);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    return res.status(403).send("You need to be logged in to perform this action\n");
  }
  getCategoryByTopic(req.body.newResourceCategory)
    .then(data => {
      addResource(req.body, userId, data.category_id)
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

router.patch('/:id', (req, res) => {
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
        const avgRating = currentRating === 0 ? userRating : (currentRating + userRating) / 2;
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
