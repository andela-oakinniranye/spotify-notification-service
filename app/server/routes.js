const Router = require('express').Router();

const { ENDPOINTS } = require('../config/constants/ENDPOINTS.js');
const BaseController = require('./controllers/BaseController');
const DeliveryController = require('./controllers/DeliveryController');
const SubscriptionController = require('./controllers/SubscriptionController');

Router.get(ENDPOINTS.base, BaseController);
Router.post(ENDPOINTS.publish, DeliveryController);
Router.post(ENDPOINTS.subscribe, SubscriptionController);

module.exports = Router;
