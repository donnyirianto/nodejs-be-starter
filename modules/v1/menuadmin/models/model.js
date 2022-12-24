const conn_local = require('../../../services/db');

const getAll = async () => {
    try{
        const [rows] = await conn_local.query("SELECT id, if(link = '#' OR link = '','Main Menu', 'Sub Menu') as jenis_menu , name_menu, link, urut, id_main, active FROM m_menu_admin ORDER BY id")
        return rows
    }catch(e){
        return "Error"
    }
}
const getMainmenu = async () => {
    try{
        const [rows] = await conn_local.query("SELECT id, name_menu FROM m_menu_admin where link='#' and active='Y' ORDER BY name_menu")
        return rows
    }catch(e){
        return "Error"
    }
}
const getCreated = async (name_menu, link,bp, id_main,urut,kdcab,id_dep,id_jabatan,active) => {
    try{
        await conn_local.query(`INSERT into m_menu_admin SET name_menu = '${name_menu}',  
        link = '${link}', bp= '${bp}', urut = '${urut}', id_main = '${id_main}', 
        kdcab = '${kdcab}', id_dep = '${id_dep}', id_jabatan = '${id_jabatan}', 
        \`active\` = '${active}',
        auth_access=''`)

        return "Sukses"
    }catch(e){
        return "Error"
    }
}

const getEdit = async (payload) => {
    try{
        const [rows] = await conn_local.query("SELECT id, name_menu, link, bp, urut, id_main, icon, active, kdcab, id_dep, id_jabatan FROM m_menu_admin where id = "+payload+";")
        return rows
    }catch(e){
        return "Error"
    }
}
const getUpdate = async (id, name_menu, link,bp, id_main,urut,kdcab,id_dep,id_jabatan,active) => {
    try{
        await conn_local.query(`UPDATE m_menu_admin SET name_menu = '${name_menu}',  
        link = '${link}', bp= '${bp}', urut = '${urut}', id_main = '${id_main}', 
        kdcab = '${kdcab}', id_dep = '${id_dep}', 
        id_jabatan = '${id_jabatan}', active = '${active}' WHERE id = '${id}';`)
        return "Sukses"
    }catch(e){
        return "Error"
    }
} 
const getDelete = async (id) => {
    try{
        await conn_local.query(`DELETE FROM m_menu_admin WHERE id = ${id}`)
        return "Sukses"
    }catch(e){
        return "Error"
    }
}

module.exports = {
    getAll,getCreated,getEdit,getUpdate,getDelete,getMainmenu
  }
