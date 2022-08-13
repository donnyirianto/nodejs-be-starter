/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authModel = require('../modules/auth/models/model');

// var dateFormat = require("dateformat")();

module.exports = {
  isAuth: (req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(req.headers.authorization);
    try {
      const a = req.headers.authorization;
      const token = a.slice(7, a.length);
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({
        message: 'Token is Invalid'
      });
    }
  },
  isAuthorized: async (req, res, next) => {
    // console.log(req.useragent)

    const { kdcab } = req.user;
    const { id_dep } = req.user;
    const { kode_cabang } = req.user;
    const { id_jabatan } = req.user;
    const { id } = req.user;
    const { username } = req.user;
    const { nik } = req.user;
    const { nama } = req.user;
    const link = req.baseUrl.split('/')[2];
    const auth_access = await authModel.auth_access(kdcab, id_dep, id_jabatan, id, link);
    if (auth_access[0].getAkses === '1') {
      next();
    } else {
      res.status(401).json({
        message: 'User Not Authorized'
      });
    }
  },
  isRefresh: (req, res, next) => {
    try {
      const { refresh_token } = req.body;
      // console.log(refresh_token)
      const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({
        message: 'Refresh Token is Invalid'
      });
    }
  }
};
