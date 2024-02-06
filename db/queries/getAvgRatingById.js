const db = require('../connection');

const getAvgRatingById = (resourceId) => {
  const values = [resourceId];
  let query = `
    SELECT AVG(rate) as avgRating
    FROM ratings
    JOIN resources
    ON resources.id = resource_id
    WHERE resources.id = $1
  `;
  return db.query(query, values)
    .then(data => data.rows[0])
    .catch(error => console.log("rating update error", error));
};

module.exports = { getAvgRatingById };
