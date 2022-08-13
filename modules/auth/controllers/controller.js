const authModel = require('../models/model');  

const getviewlistmenu = async (payload) => {
    try{             
        const listdata = await authModel.listMenu(payload)         
        const data = {
            message: "Sukses",
            listdata: listdata
        }
        return data
    }catch(e){
        return {
            message: "Menu Tidak Tersedia",
            listdata: ""
        }
    }
}
const getviewlistmenuSetting = async (kdcab,id_dep,id_jabatan) => {
    try{             
        const listdata = await authModel.listMenuSetting(kdcab,id_dep,id_jabatan)         
        const data = {
            message: "Sukses",
            listdata: listdata
        }
        return data
    }catch(e){
        return {
            message: "Menu Tidak Tersedia",
            listdata: ""
        }
    }
}
const getviewlistmenuSettingClient = async () => {
    try{             
        const listdata = await authModel.listMenuSettingClient()         
        const data = {
            message: "Sukses",
            listdata: listdata
        }
        return data
    }catch(e){
        return {
            message: "Menu Tidak Tersedia",
            listdata: ""
        }
    }
}
const getviewlistmenuSettingAdmin = async (id) => {
    try{             
        const listdata = await authModel.listMenuSettingAdmin(id)         
       
        return listdata
    }catch(e){
       return "Data Tidak Ada"
    }
}
const savemenuSettingClient = async (kdcab,id_dep,id_jabatan) => {
    try{             
        const listdata = await authModel.savemenuSettingClient(kdcab,id_dep,id_jabatan)         
        const data = {
            message: "Sukses",
            listdata: listdata
        }
        return data
    }catch(e){
        return {
            message: "Menu Tidak Tersedia",
            listdata: ""
        }
    }
}
const savemenuSettingAdmin = async (id_user,id_menu) => {
    try{
        
        const listdata = await authModel.savemenuSettingAdmin(id_user,id_menu)         
        const data = {
            message: "Sukses",
            listdata: listdata
        }
        return data
    }catch(e){
        return {
            message: "Menu Tidak Tersedia",
            listdata: ""
        }
    }
}

const getonemenuadminedit = async (id_user) => {
    try{
        
        const listdata = await authModel.getonemenuadminedit(id_user)         
        const data = {
            message: "Sukses",
            listdata: listdata
        }
        return data
    }catch(e){
        return "Data Tidak Ada"
    }
}

const getonemenuclientedit = async (id_user) => {
    try{
        
        const listdata = await authModel.getonemenuclientedit(id_user)         
        const data = {
            message: "Sukses",
            listdata: listdata
        }
        return data
    }catch(e){
        return {
            message: "Menu Tidak Tersedia",
            listdata: ""
        }
    }
}

const getlabel = async () => {
    try{             
        const listdata = await authModel.getlabel()         
        const data = {
            message: "Sukses",
            listdata: listdata
        }
        return data
    }catch(e){
        return {
            message: "Menu Tidak Tersedia",
            listdata: ""
        }
    }
} 
const getcabang = async (req) => {
    try{             
        const listdata = await authModel.getcabang(req)         
        const data = {
            message: "Sukses",
            listcabang: listdata
        }
        return data
    }catch(e){
        return {
            message: "Menu Tidak Tersedia",
            listcabang: ""
        }
    }
} 
const getdep = async () => {
    try{             
        const listdata = await authModel.getdep()         
        const data = {
            message: "Sukses",
            listdep: listdata
        }
        return data
    }catch(e){
        return {
            message: "Data Tidak Tersedia",
            listdep: ""
        }
    }
} 
const getjabatan = async (r) => {
    try{             
        const listdata = await authModel.getjabatan(r)         
        const data = {
            message: "Sukses",
            listjabatan: listdata
        }
        return data
    }catch(e){
        return {
            message: "Data Tidak Tersedia",
            listjabatan: ""
        }
    }
} 
const getcabanguser = async (payload) => {
    try{             
        const listdata = await authModel.getcabanguser(payload)         
        const data = {
            message: "Sukses",
            listcabang: listdata
        }
        return data
    }catch(e){
        return {
            message: "Data Tidak Tersedia",
            listcabang: ""
        }
    }
} 
const getcabanguserex = async (payload) => {
    try{             
        const listdata = await authModel.getcabanguserex(payload)         
        const data = {
            message: "Sukses",
            listcabang: listdata
        }
        return data
    }catch(e){
        return {
            message: "Data Tidak Tersedia",
            listcabang: ""
        }
    }
}  

const getkodecab = async (id) => {
    try{             
        const data = await authModel.getkodecab(id)    
        return data
    }catch(e){
        return "none"
    }
}
const getipwrc = async (payload) => {
    try{             
        const data = await authModel.getipwrc(payload)    
        return data
    }catch(e){
        return "none"
    }
}
const getipiriscab = async (payload) => {
    try{             
        const data = await authModel.getipiriscab(payload)    
        return data
    }catch(e){
        return "none"
    }
}
const mastertoko = async (kdcab,tanggal) => {
    try{
        const listdata = await authModel.mastertoko(kdcab,tanggal)    
        const data = {
            message: "Sukses",
            listdata: listdata
        }
        return data
       
    }catch(e){
        return {
            message: "Data Tidak Tersedia",
            listdata: ""
        }
    }
}

module.exports = {
    getviewlistmenu,getviewlistmenuSetting,getviewlistmenuSettingClient,getviewlistmenuSettingAdmin,
    savemenuSettingClient,savemenuSettingAdmin,getonemenuadminedit,getonemenuclientedit,
    getlabel,getcabang,getdep,getjabatan,getcabanguser,getcabanguserex,
    getkodecab,getipwrc,getipiriscab,mastertoko
  }
