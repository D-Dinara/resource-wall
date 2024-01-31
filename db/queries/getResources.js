const db = require('../connection');

const getResources = () => {
  return db.query('SELECT * FROM resources;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getResources };
