'use strict';

const util = require('util');
const WolframAlpha = require('wolfram-alpha');
const client = WolframAlpha.createClient(process.env.WOLFRAM_ALPHA_APP_ID || null, {format: 'plaintext'});

exports.answer = function answer(request, reply) {
  // Call Wolfram Alpha REST API and get query results.
  client.query(request.payload.payload, function (err, result) {
    if (err) throw err;

    console.log(util.inspect(result, false, null));

    let answer = '';

    // Loop through results and handle the primary `subpod` (most likely the answer).
    for (let i = 0; i < result.length; i++) {
      if (result[i].primary) {
        answer = `${result[i].title}: ${result[i].subpods[0].text}`;
        break;
      }
    }

    // If there are results but no primary `subpod`, just use the first
    // result, which is at the second array index.
    if (!answer && result.length > 1) {
      answer = `${result[1].title}: ${result[1].subpods[0].text}`;
    }

    // Send the answer to the Chat API.
    if (answer) {
      require('./chat-api').createMessage();
    }
  });

  reply('OK');
};
