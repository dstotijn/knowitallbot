'use strict';

const request = require('request');

exports.createMessage = function createMessage(contactId, payload) {
  request.post({
    url: (process.env.CHAT_API_BASE_URI || 'https://chat.messagebird.com/') + 'messages',
    auth: {
      user: process.env.CHAT_API_ACCESS_TOKEN || null,
      pass: ''
    },
    json: {
      contactId: contactId,
      payload: payload,
      type: 'text',
    }
  }, (error, response, body) => {
    if (error) throw error;

    if (body.errors) {
      console.error('Error creating message at Chat API:', JSON.stringify(body));
    }
  });
};
