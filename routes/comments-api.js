const express = require('express');
const { addComment } = require('../db/queries/addComment');
const cookieSession = require('cookie-session');
const router  = express.Router();
router.use(cookieSession({
  name: 'session',
  keys: ["somelongsecretkey987654321"],
}));

router.post('/:resourceId', (req, res) => {
  const userId = req.session.user_id;
  const resourceId = req.params.resourceId;
  const commentText = req.body.commentText;
  const newComment = {
    commentorId: userId,
    resourceId: resourceId,
    text: commentText,
  };
  addComment(newComment)
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
