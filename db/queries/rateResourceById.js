const db = require('../connection');

const rateResourceById = (id, rating) => {
  const values = [id, rating];
  let query = `
    UPDATE resources
    SET rating = $2
    WHERE resources.id = $1`;
  return db.query(query, values)
    .then(data => data.rows)
    .catch(error => console.log("rating update error", error));
};

module.exports = { rateResourceById };
