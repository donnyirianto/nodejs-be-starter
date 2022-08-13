const express = require('express');
const jabatanRoute = express.Router(); 
const  Controller = require('../controllers/controller') 
const auth = require("../../../middleware/auth");

//=================================
//             Manage jabatan
//=================================

jabatanRoute.get("/", auth.isAuthorized,async(req, res) => {
    const data = await Controller.getAll()
    res.status(200).json({
        message: 'Sukses',
        listdata: data
    });
});

jabatanRoute.post("/create", auth.isAuthorized,async(req, res) => {  
    const nama_jabatan =  req.body.nama_jabatan 
    await Controller.getCreated(nama_jabatan )
    res.status(200).json({
        message: 'Sukses'
    });
});


jabatanRoute.post("/edit", auth.isAuthorized,async(req, res) => {
    const id = req.body.id
    const data = await Controller.getEdit(id)
    res.status(200).json({
        message: 'Sukses',
        listdata: data
    });
});

jabatanRoute.get("/update", auth.isAuthorized,async(req, res) => {
    
    const id = req.body.id 
    const nama_jabatan =  req.body.nama_jabatan 
    
    await Controller.getUpdate(id,nama_jabatan)

    res.status(200).json({
        message: 'Update Sukses'
    });
});

jabatanRoute.post("/delete", auth.isAuthorized,async(req, res) => {
    const id = req.body.id 
    await Controller.getDelete(id)
    res.status(200).json({
        message: 'Sukses'
    });
});

module.exports = jabatanRoute;
