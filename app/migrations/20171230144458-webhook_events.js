'use strict';
const webhookEventDbConfig = require('../models/WebhookEvent/config');
const { appendTimestamps } = require('./migration_config');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('webhook_events', appendTimestamps(webhookEventDbConfig));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('webhook_events');
  }
};
