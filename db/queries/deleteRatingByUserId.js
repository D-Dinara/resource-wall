const db = require('../connection');

const deleteRatingByUserId = (userId, resourceId) => {
  let query = `
  DELETE FROM ratings
  WHERE rater_id = $1 AND resource_id = $2
  RETURNING *`;
  const values = [userId, resourceId];

  return db.query(query, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => console.error('deleteRatingById error', err));
};

module.exports = { deleteRatingByUserId };
