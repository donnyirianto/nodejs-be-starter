const conn_local = require('../../../services/db');

const getAll = async (x) => {
    
    try{
        if(x.kdcab === 1 || x.kdcab === 41){
            const [rows] = await conn_local.query("SELECT id, branch_code as kdcab, branch_name as nama_cabang,igr,kode_igr FROM m_branch order by kdcab")
            return rows
        }else{
            const [rows] = await conn_local.query(`SELECT id, branch_code as kdcab, branch_name as nama_cabang,igr,kode_igr FROM m_branch where id in(${x.kdcab},${x.cover}) order by kdcab`)
            return rows
        }
         
        
    }catch(e){
        return "Error"
    }
}
const getCreated = async (kdcab, namacabang,igr,kode_igr) => {
    try{
        await conn_local.query(`INSERT into m_branch SET addtime= now(), branch_code = '${kdcab}', branch_name = '${namacabang}',
                                igr ='${igr}', kode_igr='${kode_igr}'`)

        return "Sukses"
    }catch(e){
        return "Error"
    }
}

const getEdit = async (payload) => {
    try{
        const [rows] = await conn_local.query("SELECT id, branch_code as kdcab, branch_name as nama_cabang,kode_igr,igr FROM m_branch where  id ="+payload+";")
        return rows
    }catch(e){
        return "Error"
    }
}
const getUpdate = async (id, kdcab, namacabang,igr,kode_igr) => {
    try{
        await conn_local.query(`UPDATE m_branch SET branch_code = '${kdcab}', branch_name = '${namacabang}',
        igr ='${igr}', kode_igr='${kode_igr}'
        where id = ${id}`)
        return "Sukses"
    }catch(e){console.log(e)
        return "Error"
    }
} 
const getDelete = async (id) => {
    try{
        await conn_local.query(`DELETE FROM m_branch WHERE id = ${id}`)
        return "Sukses"
    }catch(e){
        return "Error"
    }
}

module.exports = {
    getAll,getCreated,getEdit,getUpdate,getDelete
  }
