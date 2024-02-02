const db = require('../connection');

const addComment = (comment) => {
  const values = [comment.resourceId, comment.commentorId, comment.text];
  let query = `
  INSERT INTO comments (resource_id, commentor_id, text)
  VALUES ($1, $2, $3);
`;

  return db.query(query, values)
    .then(data => {
      return data.rows;
    })
    .catch(err => console.error('Error executing query', err));
};

module.exports = { addComment };
