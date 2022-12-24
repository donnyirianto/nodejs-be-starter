const Redis = require('ioredis');

class RedisService {
  constructor() {
    this.client = new Redis();
  }

  async set(key, value, secondsToken, time) {
    await this.client.set(key, value, secondsToken, time);
  }

  async get(key) {
    const result = await this.client.get(key);
    return result;
  }

  async expire(key, value) {
    await this.client.expire(key, value);
  }
}
module.exports = new RedisService();
