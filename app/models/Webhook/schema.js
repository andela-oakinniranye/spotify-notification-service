/**
 * Webhook Schema module
 */
const Sequelize = require('sequelize');
const config = require('./config');
const tableName = 'webhooks';

module.exports = (sequelizeDB, modelName) => {
  const Webhook = sequelizeDB.define(modelName, config, {
    tableName,
  });

  Webhook.associate = (models) => {
    Webhook.belongsToMany(models.Event, {
      through: 'WebhookEvent',
      foreignKey: 'webhookId',
      unique: false,
    });
  };

  Webhook.findAllUserSubscriptionToEvent = (models, event, user) => {
    return Webhook.findAll({
      include: [{
        model: models.Event,
        where: {
          type: event,
        },
      }],
      where: {
          spotifyId: user.spotifyId,
        }
    });
  }

  return Webhook;
};
