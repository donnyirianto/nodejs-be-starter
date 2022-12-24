const httpStatus = require('http-status');
const catchAsync = require('../../../../utils/cathAsync');
const authModel = require('../models/model');
const tokenService = require('../../../../services/jwt.services');
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

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await tokenService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});
module.exports = { login, refreshTokens };
