/**
 * WebhookEvent Schema module
 */
const Sequelize = require('sequelize');
const config = require('./config');
const tableName = 'webhook_events';

module.exports = (sequelizeDB, modelName) => {
  const WebhookEvent = sequelizeDB.define(modelName, config, {
    tableName,
  });

  WebhookEvent.associate = (models) => {
    WebhookEvent.belongsTo(models.Event, {
      foreignKey: 'eventId',
    });

    WebhookEvent.belongsTo(models.Webhook, {
      foreignKey: 'webhookId',
    });
  };

  return WebhookEvent;
};
