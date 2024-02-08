const db = require('../connection');

const getResourceById = (id) => {
  let query = `
  SELECT title, description, thumbnail_url, resources.id AS id, comments.id as commentId, text, username, url, rating, creator_id
  FROM resources
  LEFT JOIN comments
  ON resources.id = resource_id
  LEFT JOIN users
  ON users.id = commentor_id
  WHERE resources.id = $1`;
  const values = [id];

  return db.query(query, values)
    .then(data => {
      return data.rows;
    })
    .catch(err => console.error('Error executing query', err));
};

module.exports = { getResourceById };
