module.exports = {
  apps: [{
    name: 'glacius web',
    script: 'start:production',

    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
