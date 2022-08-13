const conn_local = require('../../../services/db');

const getAll = async (req) => {
    try{
        
        if(req.user.id === 498 || req.user.id === 499 || req.user.id === 1 || req.user.id === 2 || req.user.id === 3 || req.user.id === 468){
            const [rows] = await conn_local.query("SELECT id, kdcab, jenis, namacabang, ipserver, `database`, `user`, pass, port, id as `action` FROM m_server_iris Order by jenis, kdcab")
            return rows
        }else{
            const [rows] = await conn_local.query(`
            SELECT a.id, kdcab, jenis, namacabang, ipserver, \`database\`, \`user\`, pass, 
            port, a.id as \`action\` FROM m_server_iris a
            left join m_branch b on a.kdcab = b.branch_code
            where a.jenis in('PBRO','NPP')  and b.id in(${req.user.coverage}) Order by jenis, kdcab`)
            return rows
        }
        
        
    }catch(e){
        return "Error"
    }
}
const getCreated = async (kdcab, jenis, namacabang, ipserver, database, user, password, port) => {
    try{
        await conn_local.query("INSERT into m_server_iris  SET addtime= now(), kdcab = '"+kdcab+"', jenis = '"+jenis+"', namacabang = '"+namacabang+"', ipserver = '"+ipserver+"', `database` = '"+database+"', `user` = '"+user+"', pass = '"+password+"', port = '"+port+"' ")

        return "Sukses"
    }catch(e){
        return "Error"
    }
}

const getEdit = async (payload) => {
    try{
        const [rows] = await conn_local.query("SELECT id, kdcab, jenis, concat(kdcab,'-',namacabang) as namacabang, ipserver, `database`, `user`, pass, port FROM m_server_iris where  id = "+payload+";")
        return rows
    }catch(e){
        return "Error"
    }
}
const getUpdate = async (id, kdcab, jenis, namacabang, ipserver, database, user, password, port) => {
    try{
        await conn_local.query("UPDATE m_server_iris SET kdcab = '"+kdcab+"' , jenis = '"+jenis+"'  , namacabang = '"+namacabang+"' , ipserver = '"+ipserver+"' , `database` = '"+database+"' , `user` = '"+user+"' , pass = '"+password+"' , port = '"+port+"'   WHERE id = '"+id+"' ")
        return "Sukses"
    }catch(e){
        return "Error"
    }
} 
const getDelete = async (id) => {
    try{
        await conn_local.query(`DELETE FROM m_server_iris WHERE id = ${id}`)
        return "Sukses"
    }catch(e){
        return "Error"
    }
}

module.exports = {
    getAll,getCreated,getEdit,getUpdate,getDelete
  }
