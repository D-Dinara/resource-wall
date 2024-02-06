const db = require('../connection');

const addRating = (userId, resourceId, userRating) => {
  const values = [userId, resourceId, userRating];
  let query = `
  INSERT INTO ratings (rater_id, resource_id, rate)
  VALUES ($1, $2, $3)
  RETURNING *;
`;

  return db.query(query, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => console.error('Error executing query', err));
};

module.exports = { addRating };
