const redis = require('redis');

class RedisService {
  constructor() {
    this.client = redis.createClient();
  }

  async set(key, value, options) {
    await this.client.connect();
    await this.client.set(key, value, options);
    await this.client.disconnect();
  }

  async setJson(key, value, options) {
    await this.client.connect();
    await this.client.json.set(key, value, options);
    await this.client.disconnect();
  }

  async get(key) {
    await this.client.connect();
    const result = await this.client.get(key);
    await this.client.disconnect();
    return result;
  }

  async expire(key, value) {
    await this.client.connect();
    await this.client.expire(key, value);
    await this.client.disconnect();
  }
}
module.exports = new RedisService();
