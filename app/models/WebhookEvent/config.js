const Sequelize = require('sequelize');

const config = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  eventId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  webhookId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
};

module.exports = config
