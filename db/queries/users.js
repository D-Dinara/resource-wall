const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUsersById = (id) => {
  const values = [id];
  const queryText = `
    Select *
    FROM users
    JOIN resources ON users.id = creator_id
    WHERE users.id = $1
  `;
  return db.query(queryText, values)
    .then(results => {
      return results.rows;
    })
    .catch(error => console.log("getUserById error", error));
};

module.exports = { getUsers, getUsersById };
