const express = require('express');
const router = express.Router();
const { deleteResourceById } = require('../db/queries/deleteResourceById');
const { editResourceById } = require('../db/queries/editResourceById');

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

router.put('/:id', (req, res) => {
  console.log("inside put route", req.body);
  const resourceId = req.params.id;
  editResourceById(resourceId, req.body);
  res.status(201).send();
});

module.exports = router;
