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
  SELECT DISTINCT *
  FROM likes
  FULL OUTER JOIN resources ON resources.id = resource_id
  JOIN users ON users.id = creator_id
  WHERE users.id = $1 OR owner_id = $1 OR creator_id = $1
  ORDER BY resources.title
  `;
  return db.query(queryText, values)
    .then(results => {
      return results.rows;
    })
    .catch(error => console.log("getUserById error", error));
};

module.exports = { getUsers, getUsersById };
