const express = require('express');
const cookieSession = require('cookie-session');
const router = express.Router();
router.use(cookieSession({
  name: 'session',
  keys: ["somelongsecretkey987654321"],
}));
const { deleteLikesById } = require('../db/queries/deleteLikesById');
const { addLike } = require('../db/queries/addLike');
const { getLikesByUserId } = require('../db/queries/getLikesByUserId');

router.post('/:resourceId', (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    return res.status(403).send("You need to be logged in to perform this action\n");
  }
  const resourceId = req.params.resourceId;
  // getLikesByUserId(userId,resourceId)
  //   .then(data => {
  //     if (data) {
  //       return res.status(403).send("The resource is already liked\n");
  //     }
  //   })
  addLike(userId, resourceId)
    .then(data => {
      console.log(data)
      res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.delete('/:id', (req, res) => {
  const likesId = req.params.id;
  deleteLikesById(likesId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
