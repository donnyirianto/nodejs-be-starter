const dayjs = require('dayjs');

const redis = require('../services/redis.service');

const x = async () => {
  const data = await redis.get('2012073403');
  console.log(JSON.parse(data));
  return data;
};
x();
