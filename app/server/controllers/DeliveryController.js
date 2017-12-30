const models = require('../../models').initializeModels();
const PostWebhookService = require('../../services/PostWebhook');

const DeliveryController = (req, res, next) => {
  const { event, user, payload } = req.body
  return models.Webhook.findAllUserSubscriptionToEvent(models, event, user).then((webhooks) => {
    return PostWebhookService(event, payload, webhooks).then((deliveryResponse) => {
      return res.status(200).json({delivery: { status: 'completed', response: deliveryResponse } })
    })
  })
}

module.exports = DeliveryController;
