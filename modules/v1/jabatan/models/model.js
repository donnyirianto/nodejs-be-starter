const conn_local = require('../../../services/db');

const getAll = async () => {
    try{
        const [rows] = await conn_local.query("SELECT id, nama_jabatan FROM m_jabatan order by id")
        return rows
    }catch(e){
        return "Error"
    }
}
const getCreated = async (nama_jabatan) => {
    try{
        await conn_local.query(`INSERT into m_jabatan SET nama_jabatan = UPPER('${nama_jabatan}')`)

        return "Sukses"
    }catch(e){
        return "Error"
    }
}

const getEdit = async (payload) => {
    try{
        const [rows] = await conn_local.query("SELECT id, nama_jabatan FROM m_jabatan where  id ="+payload+";")
        return rows
    }catch(e){
        return "Error"
    }
}
const getUpdate = async (id,nama_jabatan) => {
    try{
        await conn_local.query(`UPDATE m_jabatan SET nama_jabatan = UPPER('${nama_jabatan}') where id = where id = ${id}`)
        return "Sukses"
    }catch(e){
        return "Error"
    }
} 
const getDelete = async (id) => {
    try{
        await conn_local.query(`DELETE FROM m_jabatan WHERE id = ${id}`)
        return "Sukses"
    }catch(e){
        return "Error"
    }
}

module.exports = {
    getAll,getCreated,getEdit,getUpdate,getDelete
  }
