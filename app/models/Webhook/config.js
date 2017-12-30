const Sequelize = require('sequelize');

const config = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  spotifyId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: true,
  },
  notificationUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  }
};

module.exports = config
