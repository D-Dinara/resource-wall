const express = require('express');
const router = express.Router();
const { getResourcesByUserId, editUser } = require('../db/queries/users');
const { findUserById } = require('../db/queries/findUserById');

router.get('/:id?', (req, res) => {
  const userId = req.session.user_id;
  if (userId) {
    Promise.all([
      findUserById(userId),
      getResourcesByUserId(userId)
    ])
      .then(results => {
        const user = results[0];
        const resources = results[1];
        const templateVars = {
          user: user,
          resources: resources
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
