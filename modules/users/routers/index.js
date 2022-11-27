/* eslint-disable camelcase */
const express = require('express');

const userRoute = express.Router();
const Controller = require('../controllers/controller');
const auth = require('../../../middlewares/auth');

//= ================================
//             User
//= ================================

userRoute.get('/', auth.isAuthorized, async (req, res) => {
  const data = await Controller.getAll(req.user);
  res.status(200).json({
    message: 'Sukses',
    listuser: data
  });
});

userRoute.post('/add', auth.isAuthorized, async (req, res) => {
  const { nik } = req.body;
  const { nama } = req.body;
  const { password } = req.body;
  const { listCabang } = req.body;
  const { listCabangCover } = req.body;
  const { listDep } = req.body;
  const { listJabatan } = req.body;
  const { isactive } = req.body;
  const { isadmin } = req.body;
  const { ip } = req.body;
  const { flag_gabung } = req.body;
  const { priority } = req.body;
  const { akses_toko } = req.body;
  const { ismobile } = req.body;
  const { id_chat } = req.body;

  await Controller.getAdd(
    nik,
    nama,
    password,
    listJabatan,
    listDep,
    listCabang,
    listCabangCover,
    isactive,
    isadmin,
    ip,
    flag_gabung,
    priority,
    akses_toko,
    ismobile,
    id_chat
  );
  res.status(200).json({
    message: 'Sukses'
  });
});

userRoute.post('/edit', auth.isAuthorized, async (req, res) => {
  const { id } = req.body;
  const data = await Controller.getEdit(id);
  res.status(200).json({
    message: 'Sukses',
    listusers: data
  });
});

userRoute.post('/update', auth.isAuthorized, async (req, res) => {
  const { id } = req.body;
  const { nik } = req.body;
  const { nama } = req.body;
  const { listCabang } = req.body;
  const { listCabangCover } = req.body;
  const { listDep } = req.body;
  const { listJabatan } = req.body;
  const { isactive } = req.body;
  const { isadmin } = req.body;
  const { ip } = req.body;
  const { flag_gabung } = req.body;
  const { priority } = req.body;
  const { akses_toko } = req.body;
  const { ismobile } = req.body;
  const { id_chat } = req.body;

  await Controller.getUpdate(
    id,
    nik,
    nama,
    listJabatan,
    listDep,
    listCabang,
    listCabangCover,
    isactive,
    isadmin,
    ip,
    flag_gabung,
    priority,
    akses_toko,
    ismobile,
    id_chat
  );

  res.status(200).json({
    message: 'Update Sukses'
  });
});

userRoute.post('/block', auth.isAuthorized, async (req, res) => {
  const { id } = req.body;
  const { nilai } = req.body;
  await Controller.getBlock(id, nilai);
  res.status(200).json({
    message: 'Sukses'
  });
});

userRoute.post('/reset', auth.isAuthorized, async (req, res) => {
  const { id } = req.body;
  await Controller.getReset(id);
  res.status(200).json({
    message: 'Sukses'
  });
});

userRoute.post('/delete', auth.isAuthorized, async (req, res) => {
  const { id } = req.body;
  await Controller.getDelete(id);
  res.status(200).json({
    message: 'Sukses'
  });
});

module.exports = userRoute;
