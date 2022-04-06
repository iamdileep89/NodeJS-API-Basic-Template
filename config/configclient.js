const { appLogger } = require('./appLogger');
var axios = require('axios');
const config = require('./config');
const env = process.env.NODE_ENV || 'awssit';

var configUrl = config[env].configServerUrl;

var decryptUrl = config[env].decryptUrl;
var encryptedEntries = [];
global.appConfig = {};

async function getConfig() {
    try {
        var response = await axios({
            method: 'get',
            url: configUrl
        });
        await processConfigResp(response);
    } catch (error) {
        appLogger.error('error: '+error);
    }

    return appConfig;

}

async function processConfigResp(response) {
    // console.log(response.data.mongodb);
    var appConfig = response.data;
    global.appConfig = response.data;

    if (JSON.stringify(appConfig).includes("{cipher}")) {
        encryptedEntries = parseConfigResponse(appConfig, null, null);
    }
    appLogger.debug('String before decryption ' + JSON.stringify(appConfig, null, 4));
    appLogger.debug('Entries to be decrypted ' + JSON.stringify(encryptedEntries, null, 4));

    var decPromises = encryptedEntries.map((element) => decrypt(element));
    var values = await Promise.all(decPromises);
    values.map((value, index) => {
        pushNestedStr(encryptedEntries[index].key, value.data, appConfig);
    });
    appLogger.debug("String after decryption " + JSON.stringify(appConfig, null, 4));
}

function decrypt(element) {
    var datastr = element.value.substring(8);

    try {
        return axios({
            method: 'post',
            url: decryptUrl,
            headers: {
                'Content-Type': 'text/plain',
                'apikey': global.appConfig.apikey
            },
            data: datastr
        });
    } catch (error) {
        appLogger.error(error);
    }

}


function pushNestedStr(key, value, obj) {
    var keys = key.split('.');
    var keyLen = keys.length;
    for (var i = 0; i < keyLen - 1; i++) {
        var childKey = keys[i];
        obj = obj[childKey];
    }
    obj[keys[keyLen - 1]] = value;
}

function parseConfigResponse(config, parent, type) {
    if (type == null) {
        type = "nestedStr";
    }

    Object.keys(config).map(e => {
        if (typeof config[e] == 'string' || config[e] instanceof String) {

            if (config[e].startsWith("{cipher}")) {
                var keyToAdd = '';
                if (parent != null) {
                    keyToAdd += parent + '.' + e;
                } else {
                    keyToAdd += e;
                }

                var objToAdd = {};
                objToAdd["type"] = type;
                objToAdd["key"] = keyToAdd;
                objToAdd["value"] = config[e];
                encryptedEntries.push(objToAdd)
            }
        } else if (Array.isArray(config[e])) {
            var count = 0;
            config[e].forEach(element => {

                var newParent = "";
                if (parent != null) {
                    newParent = parent + "." + e + '.' + count;
                } else {
                    newParent = e;
                }
                parseConfigResponse(element, newParent, "nestedArr");
                /*    if (arr.length > 0) {
                       encryptedEntries = encryptedEntries.concat(arr);
                   } */
                count++;
            })
        } else if (config[e] instanceof Object) {
            var newParent = "";
            if (parent != null) {
                newParent = parent + "." + e;
            } else {
                newParent = e;
            }
            parseConfigResponse(config[e], newParent, type);
            /*   if (arr.length > 0) {
                  encryptedEntries = encryptedEntries.concat(arr);
              } */
        }
    });
    return encryptedEntries;
}



module.exports = getConfig;
