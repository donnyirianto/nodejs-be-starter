/* eslint-disable camelcase */
const userModel = require('../models/model');

const getAll = async (x) => {
  try {
    const data = await userModel.getAll(x);
    return data;
  } catch (e) {
    return 'Error';
  }
};
const getAdd = async (
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
) => {
  try {
    const data = await userModel.getAdd(
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
    return data;
  } catch (e) {
    return 'Error';
  }
};
const getEdit = async (payload) => {
  try {
    const data = await userModel.getEdit(payload);
    return data;
  } catch (e) {
    return 'Error';
  }
};
const getUpdate = async (
  id,
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
) => {
  try {
    const data = await userModel.getUpdate(
      id,
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
    return data;
  } catch (e) {
    return 'Error';
  }
};
const getBlock = async (id, nilai) => {
  try {
    const data = await userModel.getBlock(id, nilai);
    return data;
  } catch (e) {
    return 'Error';
  }
};
const getReset = async (id) => {
  try {
    const data = await userModel.getReset(id);
    return data;
  } catch (e) {
    return 'Error';
  }
};
const getDelete = async (id) => {
  try {
    const data = await userModel.getDelete(id);
    return data;
  } catch (e) {
    return 'Error';
  }
};
module.exports = {
  getAll,
  getAdd,
  getEdit,
  getUpdate,
  getBlock,
  getReset,
  getDelete
};
