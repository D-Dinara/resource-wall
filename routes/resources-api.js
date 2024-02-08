const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const { getResourceById } = require('../db/queries/getResourceById');
// const { rateResourceById } = require('../db/queries/rateResourceById');
const { addResource } = require('../db/queries/addResource');
const { getCategoryByTopic } = require('../db/queries/getCategoryByTopic');
const { getLikesByUserId } = require('../db/queries/getLikesByUserId');
const { getRatingByUserId } = require('../db/queries/getRatingByUserId');
const { getAvgRatingById } = require('../db/queries/getAvgRatingById');
router.use(cookieSession({
  name: 'session',
  keys: ["somelongsecretkey987654321"],
}));

router.get('/:id', (req, res) => {
  const resourceId = req.params.id;
  const userId = req.session.user_id;
  Promise.all([
    getResourceById(resourceId),
    getLikesByUserId(userId, resourceId),
    getRatingByUserId(userId, resourceId),
    getAvgRatingById(resourceId)
  ])
    .then(([resource, likes, ratings, rating]) => {
      const isLiked = likes.length !== 0 ? true : false;
      const isRated = ratings.length !== 0 ? true : false;
      const creator_id = resource[0].creator_id;
      const isOwner = creator_id == userId ? true : false;

      const responseData = {
        resource: resource,
        userId: userId,
        isLiked: isLiked,
        isRated: isRated,
        isOwner: isOwner,
        rating: rating
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
  const {newTitle, newDescription, newUrl, newResourceCategory, newThumbnail} = req.body;

  let thumbnail = newThumbnail === "" ? '../assets/no-image.png' : newThumbnail;

  getCategoryByTopic(newResourceCategory)
    .then(data => {
      addResource(newTitle, newDescription, newUrl, thumbnail, userId, data.category_id)
        .then(data => {
          res.json({data});
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
