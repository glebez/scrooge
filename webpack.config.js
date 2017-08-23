const clientConfig = require('./client/webpack.client.config.js');
const serverConfig = require('./server/webpack.server.config.js');

module.exports = [
  clientConfig,
  serverConfig
];
