'use strict';

const WolframAlpha = require('wolfram-alpha');
const client = WolframAlpha.createClient(process.env.WOLFRAM_ALPHA_APP_ID || null, {format: 'plaintext'});
const chatApi = require('./chat-api');

exports.answer = function answer(request, reply) {
  // We don't want to handle anything other than `received` messages.
  if (request.payload.status !== 'received') {
    reply('OK');
    return;
  }

  // Send a welcome message to Telegram users.
  if (request.payload.payload === '/start') {
    chatApi.createMessage(request.payload.contactId, 'Hi! Ask me anything...');
    reply('OK');
    return;
  }

  // Reject any non-text questions.
  if (request.payload.type !== 'text') {
    chatApi.createMessage(request.payload.contactId, 'Sorry, I only understand text messages...');
    reply('OK');
    return;
  }

  // Call Wolfram Alpha REST API and get query results.
  client.query(request.payload.payload, (err, result) => {
    if (err) throw err;

    let answer = '';

    // Loop through results and for primary `pod` (most likely the answer).
    for (let i = 0; i < result.length; i++) {
      if (result[i].primary) {
        answer = `${result[i].title}: ${result[i].subpods[0].text}`;
        break;
      }
    }

    // If no answer was set yet but there *are* results, just default to the second `pod`.
    // Note the first `pod` always contains the input interpretation, thus we use array index 1.
    if (!answer && result.length > 1) {
      answer = `${result[1].title}: ${result[1].subpods[0].text}`;
    }

    if (!answer) {
      answer = "Sorry, I don't have an answer for that! 😳"
    }

    // Send answer to Chat API.
    chatApi.createMessage(request.payload.contactId, answer);
  });

  reply('OK');
};
