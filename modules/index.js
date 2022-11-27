const express = require('express');
const httpStatus = require('http-status');

const router = express.Router();

//= ============================================================================
/* ANCHOR DECLARE ROUTE  */
//= ============================================================================

const authRoutes = require('./auth/routers/index');

//= ============================================================================
/* ANCHOR LOAD ROUTE  */
//= ============================================================================

router.get('/', function (req, res) {
  const data = {
    message: 'Welcome Sir'
  };
  res.status(httpStatus.OK).send(data);
});

router.use('/auth', authRoutes);

module.exports = router;
