/* eslint-disable camelcase */
const conn_local = require('../../../services/db');

const getAll = async (x) => {
  try {
    if (x.kdcab === 1 || x.kdcab === 41) {
      const [rows] = await conn_local.query(`SELECT a.id,branch_code as kdcab,
            branch_name as nama_cabang,nik,username,nama,active as isactive,
            a.id as \`action\`, isadmin,ip, flag_gabung,priority,akses_toko,ismobile
             FROM m_users a left join m_branch b on a.kdcab = b.id  ORDER BY nama asc`);
      return rows;
    }

    const [rows] = await conn_local.query(`SELECT a.id,branch_code as kdcab,
            branch_name as nama_cabang,nik,username,nama,active as isactive,
            a.id as \`action\`, isadmin,ip, flag_gabung,priority,akses_toko,ismobile
             FROM m_users a left join m_branch b on a.kdcab = b.id  
             where b.id in(${x.kdcab},${x.cover})
             ORDER BY nama asc`);
    return rows;
  } catch (e) {
    return 'Error';
  }
};
const getAdd = async (
  nik,
  nama,
  password,
  listJabatan,
  listDep,
  listCabang,
  listCabangCover,
  isactive,
  isadmin,
  ip,
  flag_gabung,
  priority,
  akses_toko,
  ismobile,
  id_chat
) => {
  try {
    await conn_local.query(`INSERT into m_users SET isadmin = '${isadmin}', 
        created_at= now(), updated_at=now(), active = '${isactive}' , nik = '${nik}', 
        username = '${nik}', nama = '${nama}', id_chat = '${id_chat}',
        password = sha1('${password}'), kdcab = '${listCabang}',
        cover = '${listCabangCover}', id_jabatan = '${listJabatan}', 
        id_dep = '${listDep}',
        ip = '${ip}',
        flag_gabung = '${flag_gabung}',
        priority = '${priority}',
        akses_toko = '${akses_toko}',
        ismobile = '${ismobile}';
        `);

    return 'Sukses';
  } catch (e) {
    return 'Error';
  }
};

const getEdit = async (payload) => {
  try {
    const [rows] =
      await conn_local.query(`SELECT id,kdcab,id_dep,cover,id_jabatan,nik,password,username,nama,
        active as isactive,id as action, id_chat,isadmin,ip, flag_gabung,priority,akses_toko,ismobile
        FROM m_users 
        where id ='${payload}';`);
    return rows;
  } catch (e) {
    return 'Error';
  }
};
const getUpdate = async (
  id,
  nik,
  nama,
  listJabatan,
  listDep,
  listCabang,
  listCabangCover,
  isactive,
  isadmin,
  ip,
  flag_gabung,
  priority,
  akses_toko,
  ismobile,
  id_chat
) => {
  try {
    await conn_local.query(`UPDATE m_users SET isadmin = '${isadmin}', updated_at=now(), id_chat = '${id_chat}',
        active = '${isactive}' , nik = '${nik}', username = '${nik}', nama = '${nama}', 
        kdcab = '${listCabang}', cover = '${listCabangCover}', 
        id_jabatan = '${listJabatan}', id_dep = '${listDep}',
        ip = '${ip}',
        flag_gabung = '${flag_gabung}',
        priority = '${priority}',
        akses_toko = '${akses_toko}',
        ismobile = '${ismobile}'
        WHERE id = '${id}'`);

    return 'Sukses';
  } catch (e) {
    return 'Error';
  }
};
const getBlock = async (id, nilai) => {
  try {
    await conn_local.query(`UPDATE m_users SET active = '${nilai}' WHERE id = ${id}`);
    return 'Sukses';
  } catch (e) {
    return 'Error';
  }
};
const getReset = async (id) => {
  try {
    await conn_local.query(`UPDATE m_users SET password = SHA1(nik) WHERE id = ${id}`);

    return 'Sukses';
  } catch (e) {
    console.log(e);
    return 'Error';
  }
};
const getDelete = async (id) => {
  try {
    await conn_local.query(`DELETE FROM m_users WHERE id = ${id}`);
    return 'Sukses';
  } catch (e) {
    return 'Error';
  }
};

module.exports = {
  getAll,
  getAdd,
  getEdit,
  getUpdate,
  getBlock,
  getReset,
  getDelete
};
