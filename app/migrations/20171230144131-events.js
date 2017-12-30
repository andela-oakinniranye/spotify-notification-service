'use strict';
const eventDbConfig = require('../models/Event/config');
const { appendTimestamps } = require('./migration_config');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('events', appendTimestamps(eventDbConfig));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('events');
  }
};
