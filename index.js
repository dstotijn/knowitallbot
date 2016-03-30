'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 8000
});

server.route({
  method: 'POST',
  path: '/webhook',
  handler: require('./bot/handlers').answer
  // handler: function (request, reply) { reply('foo')}
});

server.start((err) => {
  if (err) throw err;
  console.log('Server running at:', server.info.uri);
});
