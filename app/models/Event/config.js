const Sequelize = require('sequelize');

const config = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  }
};

module.exports = config
