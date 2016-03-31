'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 8000
});

server.route({
  method: 'POST',
  path: '/webhook',
  handler: require('./bot/handlers').answer,
  config: {
    validate: {
      payload: require('./bot/validation').webhookValidationSchema()
    }
  }
});

server.start((err) => {
  if (err) throw err;
  console.log('Server running at:', server.info.uri);
});
