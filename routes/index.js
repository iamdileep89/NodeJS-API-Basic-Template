const express = require('express');
const router = express.Router();

const findUser = require('./auth.findUser')
const healthCheck = require('./auth.healthCheck');
const { getAppConfig, refreshAppConfig } = require('./auth.appConfig');
const { NotFoundError } = require('../utils/APIError');

// Default Routes
router.get('/ping', healthCheck); // Service Health endpoint
router.get('/configprops', getAppConfig); // To get app configs
router.post('/refresh', refreshAppConfig); // To refresh/pull new configs into container

// Service Routes
router.post('/findUser', findUser);


module.exports = router;
