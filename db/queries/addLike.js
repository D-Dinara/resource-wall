const db = require('../connection');

const addLike = (userId, resourceId) => {
  const values = [userId, resourceId];
  let query = `
  INSERT INTO likes (owner_id, resource_id)
  VALUES ($1, $2)
  RETURNING *;
`;

  return db.query(query, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => console.error('Error executing query', err));
};

module.exports = { addLike };
