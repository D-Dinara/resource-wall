const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getResourcesByUserId = (id) => {
  const values = [id];
  const queryText = `
  SELECT resources.id as resources_id, creator_id, category_id, url, title, description, rating, thumbnail_url,
  likes.id as likes_id, owner_id, resource_id
  FROM likes
  FULL OUTER JOIN resources ON resources.id = resource_id
  JOIN users ON users.id = creator_id
  WHERE owner_id = $1 OR creator_id = $1
  ORDER BY resources.title
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

module.exports = { getUsers, getResourcesByUserId, editUser };
