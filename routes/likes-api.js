const express = require('express');
const cookieSession = require('cookie-session');
const router = express.Router();
router.use(cookieSession({
  name: 'session',
  keys: ["somelongsecretkey987654321"],
}));
const { addLike } = require('../db/queries/addLike');
const { getLikesByUserId } = require('../db/queries/getLikesByUserId');
const { deleteLikesByUserId } = require('../db/queries/deleteLikesByUserId');

router.post('/:resourceId', (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    return res.status(403).send("You need to be logged in to perform this action\n");
  }
  const resourceId = req.params.resourceId;
  getLikesByUserId(userId,resourceId)
    .then(data => {
      if (data.length !== 0) {
        return res.json({alreadyLiked: true});
      } else {
        addLike(userId, resourceId)
          .then(data => {
            res.json(data);
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
  deleteLikesByUserId(userId, resourceId)
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
