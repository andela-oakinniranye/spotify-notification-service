'use strict';

const uuidv4 = require('uuid/v4');

const type = 'CurrentlyPlaying:changed';
const currentDate = new Date();
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('events', [{
      id: uuidv4(),
      type,
      createdAt: currentDate,
      updatedAt: currentDate,
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('events', { type }, {});
  }
};
