module.exports = {
  apps: [
    {
      name: 'nuxt_development',
      exec_mode: 'cluster', // can be “cluster” or “fork”, default fork
      instances: 1, // can be a number of instances or “max”, default 1
      script: './node_modules/nuxt/bin/nuxt.js',
      // cwd: './node_modules/nuxt/bin',
      // env: {
      //   NODE_ENV: 'development',
      // },
      port: 3000
    },
    {
      name: 'nuxt_production',
      exec_mode: 'cluster', // can be “cluster” or “fork”, default fork
      instances: 1, // can be a number of instances or “max”, default 1
      script: './node_modules/nuxt/bin/nuxt.js',
      // cwd: './node_modules/nuxt/bin',
      args: 'start',
      env: {
        NODE_ENV: 'production'
      },
      port: 4000
    }
  ]

  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
}
