const conn_local = require('../../../services/db'); 

const checkUser = async (username,password) => {
   
    try{

        const rows = await conn_local.query(`SELECT a.*,  b.branch_code as kode_cabang, b.branch_name as nama_cabang FROM m_users a
                left join m_branch b on a.kdcab = b.id
                where username='${username}' and password = SHA1('${password}') and isadmin ='Y' and active='Y' limit 1`)
        
        return rows

    }catch(e){
        console.log(e)
        return "Error"
    }
}

const auth_access = async (id,linknya) => {
    try{
      
        const [rows] = await conn_local.query(`SELECT sum(if(id > 0,1,0)) as getAkses FROM m_menu_admin WHERE 
        auth_access like '%#${id}#%'
        and bp = '${linknya}'
        and active ='Y'`)  
        //and auth_access like '%#${id}#%'
        
        return rows

    }catch(e){
        return "Error"
    }
}

const listMenu = async (payload) => {
    try{
         
        const [rows] = await conn_local.query(`SELECT id,name_menu,link,urut,id_main,icon,
        if(id_main = 0,'mainmenu','submenu') as ket 
        FROM m_menu_admin 
        WHERE active = 'Y'
        and auth_access like '%#${payload.id}#%'
        order by urut`) 
        //and auth_access like '%#${payload.id}#%'
        return rows
    }catch(e){
        return "Tidak Ada Menu"
    }
}
const listMenuSetting = async (kdcab,id_dep,id_jabatan) => {
    try{
        
        const [rows] = await conn_local.query(`SELECT id,name_menu,link,urut,id_main,icon,
        if(id_main = 0,'mainmenu','submenu') as ket 
        FROM m_menu_admin 
        WHERE active = 'Y' 
        kdcab like '%#${kdcab}#%' 
        and id_dep like '%#${id_dep}#%' 
        and id_jabatan like '%#${id_jabatan}#%' 
        order by urut`) 
       
        return rows
    }catch(e){
        return "Tidak Ada Menu"
    }
}

const listMenuSettingClient = async () => {
    try{
        
        const [rows] = await conn_local.query(`SELECT id,name_menu,link,urut,id_main,icon,
        if(id_main = 0,'mainmenu','submenu') as ket 
        FROM m_menu 
        WHERE active = 'Y' 
        and id_jabatan is null
        order by id_main,urut`) 
       
        return rows
    }catch(e){ 
        return "Tidak Ada Menu"
    }
}


const listMenuSettingAdmin = async (id) => {
    try{
        
        const [rows] = await conn_local.query(`SELECT id,name_menu,link,urut,id_main,icon,
        if(id_main = 0,'mainmenu','submenu') as ket 
        FROM m_menu_admin 
        WHERE active = 'Y' 
        and auth_access like '%#${id}#%'
        order by urut`) 
       
        return rows
    }catch(e){  
        return "Tidak Ada Menu"
    }
}

const getonemenuadminedit= async (id_user) => {
    try{
        const [rows] = await conn_local.query(`
        select id from m_menu_admin where auth_access like '%#${id_user}#%';
        `)  
        return rows
    }catch(e){ 
        
        return "Tidak Ada Menu"
    }
}
const getonemenuclientedit = async (id_user) => {
    try{
        
        const [rows] = await conn_local.query(`
            select id from m_menu where auth_access like '%#${id_user}#%';
        `)  
       
        return rows
    }catch(e){ 
        
        return "Tidak Ada Menu"
    }
}

const savemenuSettingClient = async (id_user,id_menu) => {
    try{
        
        await conn_local.query(`
        UPDATE m_menu SET auth_access = replace(auth_access,'#${id_user}#','');
        UPDATE m_menu SET auth_access = concat(auth_access,'#${id_user}#') where id in(${id_menu});
        `)  
       
        return "Update Sukses"
    }catch(e){ 
        
        return "Tidak Ada Menu"
    }
}


const savemenuSettingAdmin = async (id_user,id_menu) => {
    try{
        await conn_local.query(`UPDATE m_menu_admin SET auth_access = replace(auth_access,'#${id_user}#','')`)
        await conn_local.query(`
        UPDATE m_menu_admin SET auth_access = concat(auth_access,'#${id_user}#') where id in(${id_menu});
        `)  
       
        return "Update Sukses"
    }catch(e){  
        return "Update Error"
    }
}

const getcabang = async (req) => {
    try{
        if(req.user.kode_cabang ==="REG4" || req.user.kode_cabang==="HO" ){
            const [rows] = await conn_local.query(`SELECT id,concat(branch_code,'-',branch_name) as nama_cabang,branch_code as kdcab
            FROM m_branch ORDER BY branch_code`) 
            return rows
        }else{
            const [rows] = await conn_local.query(`SELECT id,concat(branch_code,'-',branch_name) as nama_cabang,branch_code as kdcab
            FROM m_branch where id in(${req.user.kdcab},${req.user.cover}) ORDER BY branch_code`) 
            return rows
        }
        
        
    }catch(e){
        return "Tidak Ada Menu"
    }
}
const getlabel = async () => {
    try{
        const [rows] = await conn_local.query(`SELECT id,label FROM m_ticket_label`) 
        return rows
    }catch(e){
        return "Tidak Ada Data"
    }
}
const getdep = async () => {
    try{
        const [rows] = await conn_local.query(`SELECT id,nama_dep FROM m_dep`) 
        return rows
    }catch(e){
        return "Tidak Ada Data"
    }
}
const getjabatan = async (r) => {
    try{
        if(r == "1" || r == "12" ){
            const [rows] = await conn_local.query(`SELECT id, nama_jabatan FROM m_jabatan order by id`) 
            return rows
        }else{
            const [rows] = await conn_local.query(`SELECT id, nama_jabatan FROM m_jabatan where id not in(1,12) order by id`) 
            return rows
        }
        
        
    }catch(e){
        return "Tidak Ada Data"
    }
}
const getcabanguserex = async (payload) => {
    try{
        const [rows] = await conn_local.query(`SELECT id,branch_code as kdcab,concat(branch_code,'-',branch_name) as nama_cabang 
        FROM m_branch where branch_code not like 'HO%' and id in (${payload});`) 
        return rows
    }catch(e){
        return "Tidak Ada Data"
    }
}
const getcabanguser = async (payload) => {
    try{
        const [rows] = await conn_local.query(`SELECT id,branch_code as kdcab,
        concat(branch_code,'-',branch_name) as nama_cabang  
        FROM m_branch where id in (${payload});`) 
        return rows
    }catch(e){
        return "Tidak Ada Data"+e
    }
}
const getkodecab = async (payload) => {
    try{
        const [rows] = await conn_local.query(`SELECT id, group_concat(branch_code) as kdcab, branch_name as nama_cabang FROM m_branch WHERE id in(${payload})`) 
        return rows
    }catch(e){
        return "Tidak Ada Data"
    }
}
const getnamacab = async (payload) => {
    try{
        const [rows] = await conn_local.query(`SELECT id, branch_code as kdcab, 
                if(branch_code = 'HO','MALANG,JEMBER,MANADO,JOMBANG,SURABAYA,TERNATE,GRESIK,AMBON,BALI,LOMBOK,MAKASAR,PALOPO,KENDARI', 
                if(branch_code = 'REG2','BOGOR 2, BOGOR', branch_name)) as nama_cabang 
                FROM m_branch WHERE branch_code = '${payload}'`) 
         
        return rows
    }catch(e){
        
        return "Tidak Ada Data"
    }
}
const getnamacab2 = async (payload) => {
    
    try{
        const [rows] = await conn_local.query(`SELECT id, branch_code as kdcab,branch_name as  nama_cabang 
                FROM m_branch WHERE id in(${payload})`) 
         
        return rows
    }catch(e){
        
        return "Tidak Ada Data"
    }
}  

module.exports = {
    checkUser,
    auth_access, 
    listMenu,listMenuSetting,listMenuSettingClient,listMenuSettingAdmin,
    savemenuSettingClient,savemenuSettingAdmin,
    getonemenuadminedit,getonemenuclientedit,
    getlabel,getcabang,getdep,getjabatan,getcabanguser,getcabanguserex,
    getkodecab, 
    getnamacab,getnamacab2

  }
