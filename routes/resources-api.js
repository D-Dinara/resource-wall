const express = require('express');
const router  = express.Router();
const { getResourceById } = require('../db/queries/getResourceById');

router.get('/:id', (req, res) => {
  const resourceId = req.params.id;
  getResourceById(resourceId)
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
