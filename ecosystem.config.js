module.exports = {
  apps : [{
      name: "irisadmin",
      script: "server.js",
      instances: "1",
      autorestart: true,
      max_memory_restart: "1G",
      watch: '.',
      watch_delay: 1000,
      ignore_watch: ["node_modules", "logs", "public", "[\\/\\\\]\\./","pids", ".git", ".idea"]
    },
  ],

  env: {
    NODE_ENV: 'development'
  },
  env_production: {
    NODE_ENV: 'production'
  }
};
