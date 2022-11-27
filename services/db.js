const mysql = require('mysql2/promise');
const config = require('../config/config');

const conn = mysql.createPool(config.db);

async function query(queryString) {
  try {
    const [result] = await conn.query(queryString);
    return result;
  } catch (e) {
    console.warn(e);
    return 'DB Connection Error';
  }
}

module.exports = {
  query
};
