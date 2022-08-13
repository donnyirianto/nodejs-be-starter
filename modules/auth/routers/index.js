const express = require('express');
const authRoute = express.Router(); 
const  Controller = require('../controllers/controller') 

authRoute.get("/getviewlistmenu", async(req, res) => {
    const datauser = req.user;
    const payload = {
        kdcab: datauser.kdcab,
        id_dep: datauser.id_dep,
        id_jabatan: datauser.id_jabatan,
        id: datauser.id,
    }

    const data = await Controller.getviewlistmenu(payload)

    res.status(200).json(data);

});

authRoute.post("/getviewlistmenusetting", async(req, res) => { 
    const kdcab = req.body.kdcab
    const id_dep = req.body.id_dep
    const id_jabatan = req.body.id_jabatan
    const data = await Controller.getviewlistmenuSetting(kdcab,id_dep,id_jabatan)

    res.status(200).json(data);

});

authRoute.post("/getviewlistmenusettingclient", async(req, res) => { 
    
    /* const kdcab = req.body.kdcab
    const id_dep = req.body.id_dep
    const id_jabatan = req.body.id_jabatan */

    const data = await Controller.getviewlistmenuSettingClient()

    res.status(200).json(data);

});

authRoute.post("/getviewlistmenusettingadmin", async(req, res) => { 
    
  /*   const kdcab = req.body.kdcab
    const id_dep = req.body.id_dep
    const id_jabatan = req.body.id_jabatan */
    
    const listdata = await Controller.getviewlistmenuSettingAdmin(req.user.id)
    

    const data = {
        message: "Sukses",
        listdata: listdata
    }
    res.status(200).json(data);

});

authRoute.post("/savemenusettingclient", async(req, res) => { 
    
    const id_user = req.body.id
    const id_menu = req.body.id_menu 

    const data = await Controller.savemenuSettingClient(id_user,id_menu)

    res.status(200).json(data);

});
authRoute.post("/savemenusettingadmin", async(req, res) => { 
    
    const id_user = req.body.id
    const id_menu = req.body.id_menu
    console.log(id_menu)
    const data = await Controller.savemenuSettingAdmin(id_user,id_menu)

    res.status(200).json(id_menu);

});

authRoute.post("/getonemenuadminedit", async(req, res) => { 
    
    const id_user = req.body.id 
    const data = await Controller.getonemenuadminedit(id_user)
    res.status(200).json(data);

});
authRoute.post("/getonemenuclientedit", async(req, res) => { 
    
    const id_user = req.body.id 
    const data = await Controller.getonemenuclientedit(id_user)
    res.status(200).json(data);

});

authRoute.get("/getlabel", async(req, res) => {
    const data = await Controller.getlabel()
    res.status(200).json(data);
});
authRoute.get("/getcabang", async(req, res) => {
    const data = await Controller.getcabang(req)
    res.status(200).json(data);
});
authRoute.get("/getdep", async(req, res) => {
    const data = await Controller.getdep()
    res.status(200).json(data);
});
authRoute.get("/getjabatan", async(req, res) => {
    const data = await Controller.getjabatan(req.user.id_jabatan)
    res.status(200).json(data);
}); 
 
authRoute.post("/getcabanguser", async(req, res) => {
    const data = await Controller.getcabanguser(req.body.kdcab)
    res.status(200).json(data);
}); 
  
authRoute.post("/getcabanguserex", async(req, res) => {
    const data = await Controller.getcabanguserex(req.body.kdcab)
    res.status(200).json(data);
}); 
 
authRoute.post("/mastertoko", async(req, res) => {
    const kdcab = await Controller.getkodecab(req.body.kdcab)
    const data = await Controller.mastertoko(kdcab[0].kdcab, req.body.tanggal)
    res.status(200).json(data);
}); 
 


module.exports = authRoute;
