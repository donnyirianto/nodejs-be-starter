/* eslint-disable no-console */
const zconn = async (host, user, password, database, port, queryx) => {
  const mysql = require('mysql2/promise');
  const dbnya = {
    /* don't expose password or any sensitive info, done only for demo */ host,
    user,
    password,
    database,
    port,
    dateStrings: true,
    multipleStatements: true
  };

  try {
    const conn = await mysql.createConnection(dbnya);
    // eslint-disable-next-line func-names
    conn.connect(function (err) {
      if (err) throw err;
      console.log('Connected!');
    });

    const [result] = await conn.query(queryx);
    conn.end();
    return result;
  } catch (e) {
    // console.log(queryx)
    // console.log('Gagal Koneksi DB toko: ' + e)
    return 'Gagal';
  }
};
module.exports = zconn;
