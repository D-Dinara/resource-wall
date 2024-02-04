const db = require('../connection');

const getCategoryByTopic = (topic) => {
  let query = `
  SELECT id as category_id
  FROM categories
  WHERE topic = $1`;
  const values = [topic];

  return db.query(query, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => console.error('Error executing query', err));
};

module.exports = { getCategoryByTopic };
