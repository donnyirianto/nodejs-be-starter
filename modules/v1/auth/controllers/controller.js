const httpStatus = require('http-status');
const catchAsync = require('../../../../utils/cathAsync');
const authModel = require('../models/model');
const tokenService = require('../../../../services/auth.services');
const ApiError = require('../../../../utils/ApiError');

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const dataUser = await authModel.loginUserWithUsernameAndPassword(username, password);

  if (!dataUser.user || !dataUser.checkpass) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect Username or Password');
  }

  const tokens = await tokenService.generateAuthTokens(dataUser.user);

  res.send({ code: httpStatus.OK, message: 'Login Sukses', data: { user: dataUser.user, tokens } });
});

const logout = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  const resLogout = await tokenService.logout(refreshToken);
  if (!resLogout) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Logout Error');
  }
  res.send({ code: httpStatus.OK, message: 'Logout Sukses' });
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await tokenService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});
module.exports = { login, refreshTokens, logout };
