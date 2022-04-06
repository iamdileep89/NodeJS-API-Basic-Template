module.exports = {
    'PORT': 3000,
    'defaultEnv': 'awssit',
    'healthPath': '/ping',
    'morganFormat': ':splitter:TimeStamp: TransactionDateTime=:date[web]; Remote-Address=:remote-addr; Verb=:method; MS-URI=:url; HTTP-Version=HTTP/:http-version; Status=:status; Content-Length=:res[content-length]; Referrer=:referrer; User-Agent=:user-agent; ResponseTime=:response-time ms; RequestBody=:Body; RequestHeaders=:RequestHeaders; IsError=:IsError; Error=:Error; RefId=:RefId'
};