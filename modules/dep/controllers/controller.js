const Models = require('../models/model');

const getAll = async () => {
    try{
        const data = await Models.getAll()
        return data
    }catch(e){
        return "Error"
    }
}
const getCreated = async (nama_dep) => {
    try{
        const data = await Models.getCreated(nama_dep)
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
const getUpdate = async (id, nama_dep) => {
    try{
        const data = await Models.getUpdate(id, nama_dep)
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
