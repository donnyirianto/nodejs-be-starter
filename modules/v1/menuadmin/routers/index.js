const express = require('express');
const menuRoute = express.Router(); 
const  Controller = require('../controllers/controller') 
const auth = require("../../../middlewares/auth");
//const { auth } = require("../middleware/auth");

//=================================
//             Manage Menu
//=================================

menuRoute.get("/", auth.isAuthorized,async(req, res) => {
    const data = await Controller.getAll()
    res.status(200).json({
        message: 'Sukses',
        listdata: data
    });
});

menuRoute.post("/create", auth.isAuthorized,async(req, res) => {  
    const name_menu = req.body.name_menu
    const link = req.body.link
    const bp = req.body.bp
    const id_main = req.body.id_main
    const urut = req.body.urut
    const listCabangMenu = req.body.listCabangMenu
    const listDepMenu = req.body.listDepMenu
    const listJabatanMenu = req.body.listJabatanMenu
    const active = req.body.active
    await Controller.getCreated(name_menu,link, bp, id_main,urut,listCabangMenu,listDepMenu,listJabatanMenu,active)
    res.status(200).json({
        message: 'Sukses'
    });
});


menuRoute.post("/edit", async(req, res) => {
    const id = req.body.id  
    const data = await Controller.getEdit(id)
    res.status(200).json({
        message: 'Sukses',
        listdata: data
    });
});

menuRoute.post("/update", async(req, res) => {
    
    const id = req.body.id 
    const name_menu = req.body.name_menu
    const link = req.body.link
    const bp = req.body.bp
    const id_main = req.body.id_main
    const urut = req.body.urut
    const listCabangMenu = req.body.listCabangMenu
    const listDepMenu = req.body.listDepMenu
    const listJabatanMenu = req.body.listJabatanMenu
    const active = req.body.active 
    
    await Controller.getUpdate(id, name_menu,link,bp, id_main,urut,listCabangMenu,listDepMenu,listJabatanMenu,active)

    res.status(200).json({
        message: 'Update Sukses'
    });
});

menuRoute.post("/delete", async(req, res) => {
    const id = req.body.id 
    await Controller.getDelete(id)
    res.status(200).json({
        message: 'Sukses'
    });
});

menuRoute.get("/mainmenu", async(req, res) => { 
    const data = await Controller.getMainmenu()
    res.status(200).json({
        message: 'Sukses',
        listdata: data
    });
});
module.exports = menuRoute;
