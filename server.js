const https = require('https');
const fs = require('fs');

const fetchConfig = require('./config/configclient');
const constants = require('./config/constants');

//uncomment this for local development
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; 

const configPromise = new Promise(async (resolve, reject) => {
    try {
        const appConfig = await fetchConfig();
        resolve(appConfig);
    } catch (e) {
        reject(e)
    };
});

configPromise.then(() => {
    const app = require('./app'); //import express app
    const PORT = process.env.PORT || constants.PORT; //set PORT
    const ENV = process.env.NODE_ENV || constants.defaultEnv;
    if (ENV == 'prod' || ENV == 'preprod') {
        https.createServer({
            key: fs.readFileSync('/nodejsts/key.pem'),
            cert: fs.readFileSync('/nodejsts/certificate.pem')
        }, app)
            .listen(PORT, () => console.log(`App is listening on PORT: ${PORT} in ${ENV} environment.`)); 
    } else {
        app.listen(PORT, () => console.log(`App is listening on PORT: ${PORT} in ${ENV} environment.`));
    };
}).catch((e) => {
    console.log(`Unable to start the App. Error: ${e}`)
});