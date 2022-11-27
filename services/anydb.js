const mysql = require('mysql2/promise');

const anyconn = async (host, user, password, database, port, queryx) => {
  // eslint-disable-next-line global-require
  const dbnya = {
    host,
    user,
    password,
    database,
    port,
    dateStrings: true,
    multipleStatements: true
  };

  try {
    const conn = await mysql.createConnection(dbnya);

    conn.connect(function (err) {
      if (err) throw err;
      console.log('Connected!');
    });

    const [result] = await conn.query(queryx);
    conn.end();
    return result;
  } catch (e) {
    return 'Error Connection to DB Servers';
  }
};
module.exports = anyconn;
