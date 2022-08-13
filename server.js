/* eslint-disable import/order */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const useragent = require('express-useragent');
const compression = require('compression');

dotenv.config();

const PORT = process.env.PORT || 7171;
const app = express();
// get irisAdmin config vars
// Module - irisAdmin Parent to Router List
app.use(cors());
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));
app.use(useragent.express());

/* Anchor === irisAdmin LOG === */
app.use(morgan('tiny'));
app.use(compression());
/* Anchor === Express Security === */
app.use(helmet());
const { handleError, ErrorHandler } = require('./helpers/error');
const api = require('./modules/index');

// ------------- Load All Routes --------------
app.use('/api/', api);
app.get('/error', (req, res) => {
  throw new ErrorHandler(500, 'Internal server error');
});
app.get('*', (req, res) => {
  throw new ErrorHandler(500, 'Anda tidak memiliki Hak Akses, silahkan hubungi administrator');
});
/* Error handler middleware */
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(PORT, () => console.log(`Hello,  Service ready on port ${PORT}`));
