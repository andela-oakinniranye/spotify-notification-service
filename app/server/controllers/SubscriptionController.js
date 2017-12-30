const models = require('../../models').initializeModels();
const jwtHelper = require('../../helpers/jwt');

const sendError = (res) => {
  return (error, detail) => {
    return res.status(400).json({
      error,
      detail,
    })
  }
};

const SubscriptionController = (req, res, next) => {
  const handleError = sendError(res);

  const authHeader = req.get("authorization");
  if ( !authHeader ) return handleError(new Error('Invalid request'), "No Authorization Header provided")

  const [ type, token ] = authHeader.split(' ');
  jwtHelper.verifyToken(token).then((user) => {
    const {
      event,
      notificationUrl,
    } = req.body

    return models.Event.subscribeToEvent(models, event, user, notificationUrl).then((subscription) => {
      return res.status(200).json({
        event,
        status: 'subscribed',
        subscription,
      })
    }).catch(handleError);
  }).catch(handleError)
}

module.exports = SubscriptionController;
