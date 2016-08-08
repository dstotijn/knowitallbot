'use strict';

const Joi = require('joi');

exports.webhookValidationSchema = function webhookValidationSchema() {
  return {
    'id': Joi.string(),
    'contactId': Joi.string(),
    'channelId': Joi.string(),
    'type': Joi.string(),
    'payload': Joi.string(),
    'mediaPath': Joi.string().allow(null),
    'status': Joi.string(),
    'direction': Joi.string(),
    'reference': Joi.string().allow(null),
    'scheduledAt': Joi.string().allow(null),
    'createdAt': Joi.string(),
    'updatedAt': Joi.string().allow(null),
    '_links': Joi.object()
  };
};
