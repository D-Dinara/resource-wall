const express = require('express');
const router = express.Router();
const { getResourcesByUserId, editUser, getLikesByUserId } = require('../db/queries/users');
const { findUserById } = require('../db/queries/findUserById');

router.get('/:id?', (req, res) => {
  const userId = req.session.user_id;
  const pageId = req.params.id;
  if (userId === pageId) {
    Promise.all([
      findUserById(userId),
      getResourcesByUserId(userId),
      getLikesByUserId(userId)
    ])
      .then(results => {
        const user = results[0];
        const resources = results[1];
        const likes = results[2];
        const templateVars = {
          user: user,
          resources: resources,
          likes: likes
        };
        return res.render('users', templateVars);
      });
  } else {
    res.status(404).send("You must be logged in to access this page");
  }
});

router.put('/:id', (req, res) => {
  console.log("inside user put request");
  const userId = req.session.user_id;

  editUser(userId, req.body);
  res.status(201).send();
});

module.exports = router;
