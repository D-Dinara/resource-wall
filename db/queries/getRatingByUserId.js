const db = require('../connection');

const getRatingByUserId = (userId, resourceId) => {
  let query = `
  SELECT *
  FROM ratings
  WHERE rater_id = $1 AND resource_id = $2`;
  const values = [userId, resourceId];

  return db.query(query, values)
    .then(data => {
      console.log("DB response to rate ", data.rows);
      return data.rows;
    })
    .catch(err => console.error('Error executing query', err));
};

module.exports = { getRatingByUserId };
