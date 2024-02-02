const db = require('../connection');

const deleteLikesById = (id) => {
  console.log("inside deleteLikesById");
  let query = `
  DELETE FROM likes
  WHERE id = $1 `;
  const values = [id];

  return db.query(query, values)
    .then(data => {
      return data.rows;
    })
    .catch(err => console.error('deleteLikesById error', err));
};

module.exports = { deleteLikesById };
