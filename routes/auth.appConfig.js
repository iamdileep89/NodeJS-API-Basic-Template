const httpStatus = require("http-status");
const { APIError } = require("../utils/APIError");
const fetchConfig = require('../config/configclient');
const { transport } = require('../config/appLogger');

const getAppConfig = async (req, res, next) => {
    try {
        if(global.appConfig){
            res.json(global.appConfig);
        } else {
            throw new Error('AppConfig is not loaded in the App!')
        };
    } catch (e) {
        next(e);
    };
};

const refreshAppConfig = async (req, res, next) => {
    try {
        const appConfig = await fetchConfig();
        res.json(appConfig);
    } catch (e) {
        next(e);
    };
};


module.exports.getAppConfig = getAppConfig;
module.exports.refreshAppConfig = refreshAppConfig;