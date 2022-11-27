module.exports = {
  apps: [
    {
      name: 'beServer',
      script: 'server.js',
      instances: '1',
      autorestart: true,
      max_memory_restart: '1G',
      ignore_watch: [
        'node_modules',
        'logs',
        'public',
        '[\\/\\\\]\\./',
        'pids',
        '.git',
        '.idea',
        '.vscode'
      ]
    }
  ],

  env: {
    NODE_ENV: 'production'
  },
  env_production: {
    NODE_ENV: 'production'
  }
};
