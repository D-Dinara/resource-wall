const db = require('../connection');

const deleteResourceById = (id) => {
  console.log("inside deleteResourceById");
  let query = `
  DELETE FROM resources
  WHERE id = $1 `;
  const values = [id];

  return db.query(query, values)
    .then(data => {
      return data.rows;
    })
    .catch(err => console.error('deleteResourceById error', err));
};

module.exports = { deleteResourceById };
