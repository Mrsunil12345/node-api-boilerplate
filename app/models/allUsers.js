'use strict';

const squel = require('squel');

const config = require('app/configs/config');

const utilsService = require('app/services/utils');

const check = () => {
  const checkQuery = squel.select()
  .from(squel.select().from('roles'), 'r')
  .field('r.role')

  config.mysqlConnection.query(checkQuery.toString(), (err, result) => {
    console.log("Inside the query");
    if (err) {
       console.log(err)
    }
    return result;
  });

};

module.exports = {
  check: check
};
