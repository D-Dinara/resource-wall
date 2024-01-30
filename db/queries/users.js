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
    WHERE id = $1
  `;
  return db.query(queryText, values)
    .then(results => {
      return results.rows;
    });
};

module.exports = { getUsers, getUsersById };
