const db = require('../connection');

const getResources = (options) => {
  let query = `SELECT resources.id AS id, title, description, thumbnail_url, topic
  FROM resources
  JOIN categories
  ON categories.id = category_id `;
  const values = [];

  if (options.searchTerm) {
    const searchTerms = options.searchTerm.split(" ");
    query += `WHERE `;
    searchTerms.forEach((term, index) => {
      values.push(`%${term}%`);
      if (index > 0) {
        query += `AND `;
      }
      query += `(title ILIKE $${values.length} OR description ILIKE $${values.length}) `;
    });
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
  query += `ORDER BY id DESC `;
  return db.query(query, values)
    .then(data => {
      return data.rows;
    })
    .catch(err => console.error('Error executing query', err));
};

module.exports = { getResources };
