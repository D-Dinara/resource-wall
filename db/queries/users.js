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

const editUser = (id, formData) => {
  const { username, email, firstName, lastName } = formData;
  const values = [id, username, email, firstName, lastName];
  let queryText = `
    UPDATE users
    SET username = $2,
      email = $3,
      first_name = $4,
      last_name = $5
    WHERE users.id = $1`;
  return db.query(queryText, values)
    .then(results => results.rows)
    .catch(error => console.log("editUser error", error));
};

module.exports = { getUsers, getUsersById, editUser };
