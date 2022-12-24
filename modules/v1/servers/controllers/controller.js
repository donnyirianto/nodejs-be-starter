const Models = require('../models/model');

const getAll = async (req) => {
    try{
        const data = await Models.getAll(req)
        return data
    }catch(e){
        return "Error"
    }
}
const getCreated = async (kdcab, jenis, namacabang, ipserver, database, user, password, port) => {
    try{
        const data = await Models.getCreated(kdcab, jenis, namacabang, ipserver, database, user, password, port)
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
const getUpdate = async (id, kdcab, jenis, namacabang, ipserver, database, user, password, port) => {
    try{
        const data = await Models.getUpdate(id, kdcab, jenis, namacabang, ipserver, database, user, password, port)
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
