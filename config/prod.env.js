'use strict'
var version = require('./version')
module.exports = {
  NODE_ENV: '"production"',
  APP_INFO: JSON.stringify(version),
  API_ROOT: '"http://47.114.175.22:15672/admin_api"'

}
