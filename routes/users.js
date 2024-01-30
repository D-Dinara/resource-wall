/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getUsersById } = require('../db/queries/users');

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  // let userResources = getCurrentUserResources(userId)
  //   .then(results => {
  //     // userResources = results;
  //     return results;
  //   })
  //   .catch(error => console.log("userResources error", error));

  getUsersById(userId)
    .then(results => {
      const user = results[0];
      if (!user) {
        return res.send({ error: "no user with that id" });
      }
      const templateVars = {
        user: user,
        resources: results
      };
      return res.render('users', templateVars);
    });
});

module.exports = router;
