const db = require('../connection');

const getResources = (options) => {
  let query = `SELECT *
  FROM resources
  JOIN categories
  ON categories.id = category_id `;
  const values = [];

  if (options.searchTerm) {
    values.push(`%${options.searchTerm}%`);
    query += `WHERE title ILIKE $${values.length}`;
  }

  if (options.category) {
    if (options.category === "Category") {
      query += ``;
    } else {
      values.length === 0 ? query += `WHERE ` : query += ` AND `;
      values.push(`${options.category}`);
      query += ` topic = $${values.length}`;
    }

  }
  return db.query(query, values)
    .then(data => {
      return data.rows;
    })
    .catch(err => console.error('Error executing query', err));
};

module.exports = { getResources };
