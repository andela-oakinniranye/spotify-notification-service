'use strict';
const webhookDbConfig = require('../models/Webhook/config');
const { appendTimestamps } = require('./migration_config');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('webhooks', appendTimestamps(webhookDbConfig));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('webhooks');
  }
};
