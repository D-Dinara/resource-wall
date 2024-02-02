const db = require('../connection');

const getResourceById = (id) => {
  let query = `
  SELECT title, description, thumbnail_url, resources.id AS id, comments.id as commentId, text
  FROM resources
  JOIN comments
  ON resources.id = resource_id
  WHERE resources.id = $1 `;
  const values = [id];

  return db.query(query, values)
    .then(data => {
      console.log(data.rows);
      return data.rows;
    })
    .catch(err => console.error('Error executing query', err));
};

module.exports = { getResourceById };
