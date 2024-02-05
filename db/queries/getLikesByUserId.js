const db = require('../connection');

const getLikesByUserId = (userId, resourceId) => {
  let query = `
  SELECT *
  FROM likes
  WHERE userId = $1 AND resource_id = $2`;
  const values = [userId, resourceId];

  return db.query(query, values)
    .then(data => {
      console.log("DB response to like ", data.row[0]);
      return data.rows[0];
    })
    .catch(err => console.error('Error executing query', err));
};

module.exports = { getLikesByUserId };
