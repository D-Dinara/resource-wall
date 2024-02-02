const express = require('express');
const router = express.Router();
const { deleteResourceById } = require('../db/queries/deleteResourceById');

router.delete('/:id', (req, res) => {
  const resourceId = req.params.id;
  deleteResourceById(resourceId)
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
