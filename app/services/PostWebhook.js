const request = require('request');

module.exports = (event, payload, webhooks) => {
  const webhookPromises = webhooks.map((webhook) => {
    return new Promise((resolve, reject) => {
      const { notificationUrl, id: webhookId } = webhook.dataValues;
      return request.post(notificationUrl, {
        form: {
          event,
          payload,
          webhookId,
        }
      }, (err, response, body) => {
        // we want a retry mechanism
        if (err) return reject(err);
        return resolve(response.body);
      });
    });
  });

  return Promise.all(webhookPromises);
}
