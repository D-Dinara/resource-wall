const express = require('express');
const router = express.Router();
const { deleteLikesById } = require('../db/queries/deleteLikesById');

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
