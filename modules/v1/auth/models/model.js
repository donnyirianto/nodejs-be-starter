const bcrypt = require('bcrypt');
const conn = require('../../../../services/db');
const config = require('../../../../config/config');

/**
 * Login with username and password
 * @param {string} username
 * @param {string} password
 */
const loginUserWithUsernameAndPassword = async (username, password) => {
  const [user] = await conn.query(
    `SELECT nik,username,nama,password FROM m_users Where  username= ? `,
    username
  );
  // const hash = bcrypt.hashSync(password, 10);
  // console.log(hash);
  const checkpass = bcrypt.compareSync(password, user.password);

  return { user, checkpass };
};

// /**
//  * Logout
//  * @param {string} refreshToken
//  * @returns {Promise}
//  */
// const logout = async (refreshToken) => {
//   const refreshTokenDoc = await Token.findOne({
//     token: refreshToken,
//     type: tokenTypes.REFRESH,
//     blacklisted: false
//   });
//   if (!refreshTokenDoc) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
//   }
//   await refreshTokenDoc.remove();
// };

// /**
//  * Refresh auth tokens
//  * @param {string} refreshToken
//  * @returns {Promise<Object>}
//  */
// const refreshAuth = async (refreshToken) => {
//   try {
//     const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
//     const user = await userService.getUserById(refreshTokenDoc.user);
//     if (!user) {
//       throw new Error();
//     }
//     await refreshTokenDoc.remove();
//     return tokenService.generateAuthTokens(user);
//   } catch (error) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
//   }
// };

// /**
//  * Reset password
//  * @param {string} resetPasswordToken
//  * @param {string} newPassword
//  * @returns {Promise}
//  */
// const resetPassword = async (resetPasswordToken, newPassword) => {
//   try {
//     const resetPasswordTokenDoc = await tokenService.verifyToken(
//       resetPasswordToken,
//       tokenTypes.RESET_PASSWORD
//     );
//     const user = await userService.getUserById(resetPasswordTokenDoc.user);
//     if (!user) {
//       throw new Error();
//     }
//     await userService.updateUserById(user.id, { password: newPassword });
//     await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
//   } catch (error) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
//   }
// };

// /**
//  * Verify email
//  * @param {string} verifyEmailToken
//  * @returns {Promise}
//  */
// const verifyEmail = async (verifyEmailToken) => {
//   try {
//     const verifyEmailTokenDoc = await tokenService.verifyToken(
//       verifyEmailToken,
//       tokenTypes.VERIFY_EMAIL
//     );
//     const user = await userService.getUserById(verifyEmailTokenDoc.user);
//     if (!user) {
//       throw new Error();
//     }
//     await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
//     await userService.updateUserById(user.id, { isEmailVerified: true });
//   } catch (error) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
//   }
// };

module.exports = {
  loginUserWithUsernameAndPassword
  //   logout,
  //   refreshAuth,
  //   resetPassword,
  //   verifyEmail
};
