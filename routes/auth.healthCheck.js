const { transport } = require('../config/appLogger')

module.exports = async (req, res, next) => {
    return res.json({
        'status': 'Up',
        'logLevel': transport.console.level
    })
};