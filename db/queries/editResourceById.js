const db = require('../connection');

const editResourceById = (id, formData) => {
  const { title, description, url } = formData;
  const values = [id, title, description, url];
  let queryText = `
    UPDATE resources
    SET title = $2,
      description = $3,
      url = $4
    WHERE resources.id = $1`;
  return db.query(queryText, values)
    .then(results => results.rows)
    .catch(error => console.log("editUser error", error));
};

module.exports = { editResourceById };
