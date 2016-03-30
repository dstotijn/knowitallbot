'use strict';

const WolframAlpha = require('wolfram-alpha');
const client = WolframAlpha.createClient(process.env.WOLFRAM_ALPHA_APP_ID || null, {format: 'plaintext'});

exports.answer = function answer(request, reply) {

  // We don't want to handle anything other than `received` messages.
  if (request.payload.status !== 'received') {
    return;
  }

  if (request.payload.payload === '/start') {
    require('./chat-api').createMessage(request.payload.contactId, 'Hi! Ask me anything...');
    return;
  }

  if (request.payload.type !== 'text') {
    require('./chat-api').createMessage(request.payload.contactId, 'Sorry, I only understand text messages...');
    return;
  }

  // Call Wolfram Alpha REST API and get query results.
  client.query(request.payload.payload, function (err, result) {
    if (err) throw err;

    let answer = '';

    // Loop through results and handle the primary `subpod` (most likely the answer).
    for (let i = 0; i < result.length; i++) {
      if (result[i].primary) {
        answer = `${result[i].title}: ${result[i].subpods[0].text}`;
        break;
      }
    }

    if (!answer && result.length > 1) {
      answer = `${result[1].title}: ${result[1].subpods[0].text}`;
    }

    if (!answer) {
      answer = "Sorry, I don't have an answer for that! 😳"
    }

    if (answer) {
      require('./chat-api').createMessage(request.payload.contactId, answer);
    }
  });

  reply('OK');
};
