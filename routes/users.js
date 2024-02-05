/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getResourcesByUserId, editUser } = require('../db/queries/users');
const { findUserById } = require('../db/queries/findUserById');

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  Promise.all([
    findUserById(userId),
    getResourcesByUserId(userId)
  ])
    .then(results => {
      const user = results[0];
      const resources = results[1];
      if (!user.id) {
        return res.send({ error: "no user with that id" });
      }
      const templateVars = {
        user: user,
        resources: resources
      };
      return res.render('users', templateVars);
    });
});

router.put('/:id', (req, res) => {
  const userId = req.params.id;

  editUser(userId, req.body);
  res.status(201).send();
});

module.exports = router;
