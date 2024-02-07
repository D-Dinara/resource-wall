const db = require('../connection');

const getLikesByUserId = (userId, resourceId) => {
  let query = `
  SELECT *
  FROM likes
  WHERE owner_id = $1 AND resource_id = $2`;
  const values = [userId, resourceId];

  return db.query(query, values)
    .then(data => {
      return data.rows;
    })
    .catch(err => console.error('Error executing query', err));
};

module.exports = { getLikesByUserId };
