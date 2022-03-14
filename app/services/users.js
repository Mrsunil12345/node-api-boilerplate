'use strict';

const status = require('app/configs/status');

const usersModel = require('app/models/users');

const getAllUsers = (params, callback) => {
  let userParams = {};

  usersModel.getAllUsers(userParams, (err, result) => {
    if (err) {
      return callback(err);
    }

    let response = status.getStatus('success');
    response.data = {};
    response.data.users = result;

    return callback(null, response);
  })
};

module.exports = {
  getAllUsers: getAllUsers
}
