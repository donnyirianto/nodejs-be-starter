const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

//= ============================================================================
/* ANCHOR DECLARE ROUTE  */
//= ============================================================================

const regRoutes = require('./reg');
const authRoutes = require('./auth/routers/index');
const userRoutes = require('./users/routers/index');
const serversRoutes = require('./servers/routers/index');
const cabangRoutes = require('./cabang/routers/index');
const depRoutes = require('./dep/routers/index');
const jabatanRoutes = require('./jabatan/routers/index');
const menuadminRoutes = require('./menuadmin/routers/index');

//= ============================================================================
/* ANCHOR LOAD ROUTE  */
//= ============================================================================
router.use('/', regRoutes);
router.use('/auth', auth.isAuth, authRoutes);
router.use('/users', auth.isAuth, userRoutes);
router.use('/servers', auth.isAuth, serversRoutes);
router.use('/cabang', auth.isAuth, cabangRoutes);
router.use('/dep', auth.isAuth, depRoutes);
router.use('/jabatan', auth.isAuth, jabatanRoutes);
router.use('/menuadmin', auth.isAuth, menuadminRoutes);

module.exports = router;
