module.exports = {
  "dev": {
    "configServerUrl": "https://{{host}}/{{basepath}}/{{config}}-dev.json",
    "decryptUrl": "https://{{host}}/{{basepath}}/decrypt"
  },
  "sit": {
    "configServerUrl": "https://{{host}}/{{basepath}}/{{config}}-sit.json",
    "decryptUrl": "https://{{host}}/{{basepath}}/decrypt"
  },
  "uat": {
    "configServerUrl": "https://{{host}}/{{basepath}}/{{config}}-uat.json",
    "decryptUrl": "https://{{host}}/{{basepath}}/decrypt"
  },
  "perf": {
    "configServerUrl": "https://{{host}}/perf/{{basepath}}/{{config}}-perf.json",
    "decryptUrl": "https://{{host}}/{{basepath}}/decrypt"
  },
  "awssit": {
    "configServerUrl": "https://{{host}}/{{basepath}}/{{config}}-awssit.json",
    "decryptUrl": "https://{{host}}/{{basepath}}/decrypt"
  },
  "awsuat": {
    "configServerUrl": "https://{{host}}/{{basepath}}/{{config}}-awsuat.json",
    "decryptUrl": "https://{{host}}/{{basepath}}/decrypt"
  },
  "mosit": {
    "configServerUrl": "https://{{host}}/{{basepath}}/{{config}}-mosit.json",
    "decryptUrl": "https://{{host}}/{{basepath}}/decrypt"
  },
  "mouat": {
    "configServerUrl": "https://{{host}}/{{basepath}}/{{config}}-mouat.json",
    "decryptUrl": "https://{{host}}/{{basepath}}/decrypt"
  },
  "preprod": {
    "configServerUrl": "https://{{host}}/{{basepath}}/{{config}}-preprod.json",
    "decryptUrl": "https://{{host}}/{{basepath}}/decrypt"
  },
  "prod": {
    "configServerUrl": "https://{{host}}/{{basepath}}/{{config}}-prod.json",
    "decryptUrl": "https://{{host}}/{{basepath}}/decrypt"
  },
  "dr": {
    "configServerUrl": "https://{{host}}/{{basepath}}/{{config}}-dr.json",
    "decryptUrl": "https://{{host}}/{{basepath}}/decrypt"
  }
}