const express = require('express');
const xss = require('xss-clean');
const cors = require('cors');
const helmet = require('helmet');
const httpStatus = require('http-status');
const useragent = require('express-useragent');
const compression = require('compression');
const morgan = require('morgan');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();
// set security HTTP headers
app.use(helmet());
// parse json request body
app.use(express.json({ limit: '50mb' }));
// parse urlencoded request body
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true
  })
);
// sanitize request data
app.use(xss());
// enable cors
app.use(cors());
app.options('*', cors());

// gzip compression
app.use(compression());

// Loging request
app.use(morgan('combination'));
app.use(useragent.express());
// initial public folder
app.use(express.static('public'));

// ------------- Load All Routes --------------
const api = require('./modules/index');

app.use('/api/', api);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
module.exports = app;
