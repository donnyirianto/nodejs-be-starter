const conn = require('./db');

const getUserById = async (user) => {
  const data = await conn.query(
    `SELECT nik,username,nama,password FROM m_users Where  nik= ? `,
    user.nik
  );

  return data;
};

module.exports = {
  getUserById
};
