const db = require('../connection');

const deleteLikesByUserId = (userId, resourceId) => {
  let query = `
  DELETE FROM likes
  WHERE owner_id = $1 AND resource_id = $2
  RETURNING *`;
  const values = [userId, resourceId];

  return db.query(query, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => console.error('deleteLikesById error', err));
};

module.exports = { deleteLikesByUserId };
