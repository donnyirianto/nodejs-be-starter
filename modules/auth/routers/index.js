const express = require('express');
const validate = require('../../../middlewares/validate');
const authValidation = require('../../../validation/auth.validation');

const authRoute = express.Router();
const authController = require('../controllers/controller');

authRoute.post('/login', validate(authValidation.login), authController.login);

module.exports = authRoute;
