const db = require('../connection');

const addResource = (newTitle, newDescription, newUrl, newThumbnail, creator_id, category_id) => {
  const values = [creator_id, newTitle, newDescription, newUrl, category_id, newThumbnail];
  let query = `
  INSERT INTO resources (creator_id, title, description, url, category_id, thumbnail_url)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
`;

  return db.query(query, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => console.error('Error executing query', err));
};

module.exports = { addResource };
