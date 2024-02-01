const db = require('../connection');

const getResourceById = (id) => {
  let query = `
  SELECT *
  FROM resources
  WHERE id = $1 `;
  const values = [id];

  return db.query(query, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => console.error('Error executing query', err));
};

module.exports = { getResourceById };
