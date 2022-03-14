'use strict';

const mysql = require('mysql');
const os = require('os');

const mysqlConnectionString = {
  host: 'xane-development.cwwqesjeggcm.ap-south-1.rds.amazonaws.com',
  user: 'xane',
  password: 'dev.xane.ai',
  database: 'platform',
  port: 3306
};

const mysqlConnection = mysql.createConnection(mysqlConnectionString);

const MORGAN_LOG_PATH = `${os.homedir()}/.logs`;

const HEALTHCHECKS = {
  DEPLOY_BASE_URL: '',
  URL: 'https://hc-ping.com/uuid'
};

const config = {
  mysqlConnection: mysqlConnection,
  MORGAN_LOG_PATH: MORGAN_LOG_PATH,
  HEALTHCHECKS: HEALTHCHECKS
}

module.exports = config;
