'use strict';

const squel = require('squel');

const config = require('app/configs/config');

const utilsService = require('app/services/utils');

const getAllUsers = (params, callback) => {
  const checkQuery = squel.select()
    .field('id')
    .from('users', 'u')
    .limit(10)

  config.mysqlConnection.query(checkQuery.toString(), (err, result) => {
    console.log("Inside the query");
    if (err) {
      return callback(err);
    }

    return callback(null, result);
  });

};

module.exports = {
  getAllUsers: getAllUsers
};
