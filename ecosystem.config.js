module.exports = {
  apps: [
    {
      name: 'server', // Name your application
      script: 'npm', // Specify the process to run
      args: 'start -- --port 3000', // Arguments for the process (runs 'npm start')
      cwd: './apps/server', // Current working directory, typically your project root
      env: {
        NODE_ENV: 'production', // Environment variables
      },
    },
    {
      name: 'web', // Name your application
      script: 'npm', // Specify the process to run
      args: 'start -- --port 3001', // Arguments for the process (runs 'npm start')
      cwd: './apps/web', // Current working directory, typically your project root
      env: {
        NODE_ENV: 'production', // Environment variables
      },
    },
    {
      name: 'admin', // Name your application
      script: 'npm', // Specify the process to run
      args: 'start -- --port 3002', // Arguments for the process (runs 'npm start')
      cwd: './apps/admin', // Current working directory, typically your project root
      env: {
        NODE_ENV: 'production', // Environment variables
      },
    },
  ],
  deploy: {
    development: {
      key: './wollybee-dev.pem',
      user: 'ubuntu',
      host: '13.235.75.208',
      ref: 'origin/main',
      repo: 'git@github.com:Cielweb-Solutions/wollybee.git',
      path: '/home/ubuntu',
      'post-deploy': 'pm2 startOrRestart ecosystem.config.json --env development',
    },
  },
};

