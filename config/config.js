const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description('days after which refresh tokens expire'),
    DB_HOST: Joi.string().required().description('Database MySQL HOST'),
    DB_USER: Joi.string().required().description('Database MySQL USERNAME'),
    DB_PASS: Joi.string().required().description('Database MySQL PASSWORD'),
    DB_PORT: Joi.string().required().description('Database MySQL PORT'),
    DB_POOLING_LIMIT: Joi.string().required().description('Database MySQL POOLING LIMIT'),
    REDIS_HOST: Joi.string().required().description('REDIS HOST'),
    REDIS_PORT: Joi.string().required().description('REDIS PORT')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS
  },
  db: {
    host: envVars.DB_HOST,
    user: envVars.DB_USER,
    password: envVars.DB_PASS,
    database: envVars.DB_NAME,
    port: envVars.DB_PORT,
    connectionLimit: envVars.DB_POOLING_LIMIT,
    waitForConnections: true,
    queueLimit: 0,
    dateStrings: true,
    multipleStatements: true
  },
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT
  }
};
