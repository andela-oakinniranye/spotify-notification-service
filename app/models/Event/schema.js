/**
 * User Schema module
 */
const Sequelize = require('sequelize');
const config = require('./config');
const tableName = 'events';

module.exports = (sequelizeDB, modelName) => {
  const Event = sequelizeDB.define(modelName, config, {
    tableName,
  });

  Event.associate = (models) => {
    Event.belongsToMany(models.Webhook, {
      through: 'WebhookEvent',
      foreignKey: 'eventId',
      unique: false,
    });
  };

  Event.subscribeToEvent = (models, event, user, notificationUrl) => {
    return new Promise((resolve, reject) => {
      return Event.findOne({ where: { type: event }}).then((event) => {
        if (event) {
          return models.Webhook.create({
            spotifyId: user.spotifyId,
            userId: user.id,
            notificationUrl,
          }).then((webhook) => {
            return event.addWebhook(webhook).then((record) => {
              return resolve(record);
            })
          })
        }
        return reject(new Error('Event not found'));
      }).catch((err) => {
        return reject(err);
      });
    })
  }

  return Event;
};
