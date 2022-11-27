const express = require('express');
const cabangRoute = express.Router(); 
const  Controller = require('../controllers/controller') 
const auth = require("../../../middlewares/auth");

//=================================
//             Manage Cabang
//=================================

cabangRoute.get("/",auth.isAuthorized, async(req, res) => {
    const data = await Controller.getAll(req.user)
    res.status(200).json({
        message: 'Sukses',
        listdata: data
    });
});

cabangRoute.post("/create",auth.isAuthorized, async(req, res) => { 
    const kdcab = req.body.kdcab 
    const namacabang =  req.body.namacabang
    var igr =""
    var kode_igr =""

    if(typeof req.body.kode_igr === "undefined" || req.body.kode_igr === ""){
        igr = "N"
        kode_igr =  ""
    }else{
        igr = "Y"
        kode_igr =  req.body.kode_igr
    }
    console.log(kdcab,namacabang,igr,kode_igr )
    await Controller.getCreated(kdcab,namacabang,igr,kode_igr )
    res.status(200).json({
        message: 'Sukses'
    });
});


cabangRoute.post("/edit", auth.isAuthorized,async(req, res) => {
    const id = req.body.id
    const data = await Controller.getEdit(id)
    res.status(200).json({
        message: 'Sukses',
        listdata: data
    });
});

cabangRoute.post("/update", auth.isAuthorized,async(req, res) => {
    
    const id = req.body.id
    const kdcab = req.body.kdcab 
    const namacabang =  req.body.namacabang 
    var igr =""
    var kode_igr =""

    if(typeof req.body.kode_igr === "undefined" || req.body.kode_igr === ""){
        igr = "N"
        kode_igr =  ""
    }else{
        igr = "Y"
        kode_igr =  req.body.kode_igr
    }
    console.log(kdcab,namacabang,igr,kode_igr ) 
    
    await Controller.getUpdate(id, kdcab,namacabang,igr,kode_igr)

    res.status(200).json({
        message: 'Update Sukses'
    });
});

cabangRoute.post("/delete", auth.isAuthorized, async(req, res) => {
    //const id = req.body.id 
    //await Controller.getDelete(id)
    res.status(200).json({
        message: 'Sukses'
    });
});

module.exports = cabangRoute;
