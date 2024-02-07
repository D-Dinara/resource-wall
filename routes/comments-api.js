const express = require('express');
const { addComment } = require('../db/queries/addComment');
const cookieSession = require('cookie-session');
const { findUserById } = require('../db/queries/findUserById');
const router  = express.Router();
router.use(cookieSession({
  name: 'session',
  keys: ["somelongsecretkey987654321"],
}));

router.post('/:resourceId', (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    return res.status(403).send("You need to be logged in to perform this action\n");
  }
  const resourceId = req.params.resourceId;
  const commentText = req.body.commentText;
  const newComment = {
    commentorId: userId,
    resourceId: resourceId,
    text: commentText,
  };

  const trimmedComment = commentText.trim();
  if (trimmedComment === "") {
    return res.status(403).send("The comment text can not be empty\n");
  }
  Promise.all([
    findUserById(userId),
    addComment(newComment)
  ])
    .then(([user, newComment]) => {
      res.json([user, newComment]);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
