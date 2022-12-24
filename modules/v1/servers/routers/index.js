const express = require('express');
const serversRoute = express.Router(); 
const  Controller = require('../controllers/controller') 
const auth = require("../../../middlewares/auth");

//=================================
//             Manage Servers
//=================================

serversRoute.get("/", auth.isAuthorized,async(req, res) => {
    const data = await Controller.getAll(req)
    res.status(200).json({
        message: 'Sukses',
        listdata: data
    });
});

serversRoute.post("/create", auth.isAuthorized,async(req, res) => { 
    const kdcab = req.body.kdcab
    const jenis = req.body.jenis
    const namacabang =  req.body.namacabang
    const ipserver = req.body.ipserver
    const database = req.body.database
    const user = req.body.user
    const password = req.body.password
    const port = req.body.port
    console.log(kdcab, jenis, namacabang, ipserver, database, user, password, port)
    await Controller.getCreated(kdcab, jenis, namacabang, ipserver, database, user, password, port)
    res.status(200).json({
        message: 'Sukses'
    });
});


serversRoute.post("/edit", auth.isAuthorized,async(req, res) => {
    const id = req.body.id
    const data = await Controller.getEdit(id)
    res.status(200).json({
        message: 'Sukses',
        listdata: data
    });
});

serversRoute.post("/update", auth.isAuthorized,async(req, res) => {
    
    const id = req.body.id
    const kdcab = req.body.kdcab
    const jenis = req.body.jenis === "FTP" ? "TAMPUNG" : req.body.jenis
    const namacabang =  req.body.namacabang
    const ipserver = req.body.ipserver
    const database = req.body.database
    const user = req.body.user
    const password = req.body.password
    const port = req.body.port
    
    await Controller.getUpdate(id, kdcab, jenis, namacabang, ipserver, database, user, password, port)

    res.status(200).json({
        message: 'Update Sukses'
    });
});

serversRoute.post("/delete", auth.isAuthorized,async(req, res) => {
    const id = req.body.id 
    await Controller.getDelete(id)
    res.status(200).json({
        message: 'Sukses'
    });
});

module.exports = serversRoute;
