const express = require('express');
const depRoute = express.Router(); 
const Controller = require('../controllers/controller') 
const auth = require("../../../middleware/auth");

//=================================
//             Manage Department
//=================================

depRoute.get("/", auth.isAuthorized,async(req, res) => {
    const data = await Controller.getAll()
    res.status(200).json({
        message: 'Sukses',
        listdata: data
    });
});

depRoute.post("/create", auth.isAuthorized,async(req, res) => {  
    const nama_dep =  req.body.nama_dep 
    await Controller.getCreated(nama_dep )
    res.status(200).json({
        message: 'Sukses'
    });
});


depRoute.post("/edit", auth.isAuthorized,async(req, res) => {
    const id = req.body.id
    const data = await Controller.getEdit(id)
    res.status(200).json({
        message: 'Sukses',
        listdata: data
    });
});

depRoute.post("/update", auth.isAuthorized,async(req, res) => {
    
    const id = req.body.id 
    const nama_dep =  req.body.nama_dep 
    
    await Controller.getUpdate(id, nama_dep)

    res.status(200).json({
        message: 'Update Sukses'
    });
});

depRoute.post("/delete", auth.isAuthorized,async(req, res) => {
    const id = req.body.id 
    await Controller.getDelete(id)
    res.status(200).json({
        message: 'Sukses'
    });
});

module.exports = depRoute;
