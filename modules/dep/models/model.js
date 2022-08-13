const conn_local = require('../../../services/db');

const getAll = async () => {
    try{
        const [rows] = await conn_local.query("SELECT id, nama_dep FROM m_dep order by id")
        return rows
    }catch(e){
        return "Error"
    }
}
const getCreated = async (nama_dep) => {
    try{
        await conn_local.query(`INSERT into m_dep SET nama_dep = UPPER('${nama_dep}')`)

        return "Sukses"
    }catch(e){
        return "Error"
    }
}

const getEdit = async (payload) => {
    try{
        const [rows] = await conn_local.query("SELECT id, nama_dep FROM m_dep where id ="+payload+";")
        return rows
    }catch(e){
        return "Error"
    }
}
const getUpdate = async (id, nama_dep) => {
    try{
        await conn_local.query(`UPDATE m_dep SET  nama_dep = '${nama_dep}' where id = ${id}`)
        return "Sukses"
    }catch(e){
        return "Error"
    }
} 
const getDelete = async (id) => {
    try{
        await conn_local.query(`DELETE FROM m_dep WHERE id = ${id}`)
        return "Sukses"
    }catch(e){
        return "Error"
    }
}

module.exports = {
    getAll,getCreated,getEdit,getUpdate,getDelete
  }
