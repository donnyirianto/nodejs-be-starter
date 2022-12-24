const Models = require('../models/model');

const getAll = async (req) => {
    try{
        const data = await Models.getAll(req)
        return data
    }catch(e){
        return "Error"
    }
}
const getCreated = async (kdcab, namacabang,igr,kode_igr) => {
    try{
        const data = await Models.getCreated(kdcab, namacabang,igr,kode_igr)
        return data
    }catch(e){
        return "Error"
    }
}
const getEdit = async (payload) => {
    try{
        const data = await Models.getEdit(payload)
        return data
    }catch(e){
        return "Error"
    }
}
const getUpdate = async (id, kdcab, namacabang,igr,kode_igr) => {
    try{
        const data = await Models.getUpdate(id, kdcab, namacabang,igr,kode_igr)
        return data
    }catch(e){
        return "Error"
    }
} 
const getDelete = async (id) => {
    try{
        const data = await Models.getDelete(id)
        return data
    }catch(e){
        return "Error"
    }
}
module.exports = {
    getAll,getCreated,getEdit,getUpdate,getDelete
  }
