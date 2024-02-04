const express = require('express');
const router  = express.Router();
const { getResourceById } = require('../db/queries/getResourceById');
const { rateResourceById } = require('../db/queries/rateResourceById');

router.get('/:id', (req, res) => {
  const resourceId = req.params.id;
  getResourceById(resourceId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/:id', (req, res) => {
  const resourceId = req.params.id;
  const userRating = parseFloat(req.body.rateOption);
  console.log(userRating, typeof(userRating))
  if (userRating) {
    getResourceById(resourceId)
      .then(data => {
        const currentRating = parseFloat(data[0].rating)
        const avgRating = (currentRating+ userRating) / 2;
        console.log(currentRating, typeof(currentRating))
        console.log(avgRating)
        rateResourceById(resourceId, avgRating)
      })
  }
  // rateResourceById(resourceId,userRating)
  //   .then(data => {
  //     console.log(data)
  //     res.json(data);
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .json({ error: err.message });
  //   });
});

module.exports = router;
