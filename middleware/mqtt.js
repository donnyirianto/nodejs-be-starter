const mqtt = require('mqtt');

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = 'http://172.24.16.131';
    this.options = {
      keepalive: 0,
      reconnectPeriod: 1000
    };
  }

  connect() {
    this.mqttClient = mqtt.connect(this.host, this.options);
    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });
    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  sendMessage(topic, message) {
    // console.log(message)
    this.mqttClient.publish('${topic}/', message);
  }
}

module.exports = MqttHandler;
