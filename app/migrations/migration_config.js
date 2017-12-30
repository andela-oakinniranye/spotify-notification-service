const Sequelize = require('sequelize');

const appendTimestamps = (config) => {
  const timestamps = {
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  };

  return Object.assign({}, config, timestamps);
}

module.exports = {
  appendTimestamps,
}
