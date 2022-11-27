/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const authModel = require('./auth/models/model');
require('dotenv').config();

const auth = require('../middlewares/auth');

// eslint-disable-next-line func-names
router.get('/', function (req, res) {
  res.status(200).json({
    message: 'Welcome to API - Network Monitoring'
  });
});

// eslint-disable-next-line consistent-return
router.post('/login', async (req, res) => {
  const { username } = req.body;
  const { password } = req.body;

  // const hashPassword = bcrypt.hashSync(password, process.env.KEYSTRONG);

  const dataUser = await authModel.checkUser(username, password);
  const checknya = dataUser.length > 0;

  if (checknya) {
    const jwtUser = {
      id: dataUser[0].id,
      kdcab: dataUser[0].kdcab,
      kode_cabang: dataUser[0].kode_cabang,
      nama_cabang: dataUser[0].nama_cabang,
      id_dep: dataUser[0].id_dep,
      id_jabatan: dataUser[0].id_jabatan,
      cover: dataUser[0].cover,
      isadmin: dataUser[0].isadmin,
      nik: dataUser[0].nik,
      username: dataUser[0].username,
      nama: dataUser[0].nama
    };
    const token = jwt.sign(jwtUser, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE
    });
    const refreshToken = jwt.sign(jwtUser, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_LIFE
    });
    if (token) {
      console.log(token);
      res.status(200).json({
        message: 'Login Sukses',
        accessToken: token,
        refreshToken,
        accessTokenExpiry: 86400,
        userdata: jwtUser
      });
    }
    console.log('Sukses login');
  } else {
    console.log('gagal login');
    return res.status(401).send();
  }
});

// eslint-disable-next-line consistent-return
router.post('/refreshtoken', auth.isRefresh, async (req, res) => {
  const jwtUser = req.user;
  const refreshToken = req.body.refresh_token;

  const token = jwt.sign(jwtUser, process.env.ACCESS_TOKEN_SECRET);

  if (token) {
    res.status(201).json({
      message: 'Relogin Sukses',
      token,
      refreshToken,
      user: jwtUser
    });
  } else {
    // console.log("gagal login")
    return res.status(401).send();
  }
});

module.exports = router;
