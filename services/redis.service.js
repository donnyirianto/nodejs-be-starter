const Redis = require('ioredis');
const config = require('../config/config');

class RedisService {
  constructor() {
    try {
      this.client = new Redis(config.redis.port, config.redis.host);
      console.log(`Redis Connected`);
    } catch (error) {
      console.log(error);
    }
  }

  async set(key, value, secondsToken, time) {
    const res = await this.client.set(key, value, secondsToken, time);
    return res;
  }

  async get(key) {
    const result = await this.client.get(key);
    return result;
  }

  async del(key) {
    const result = await this.client.del(key);
    return result;
  }

  async expire(key, value) {
    await this.client.expire(key, value);
  }
}
module.exports = new RedisService();
