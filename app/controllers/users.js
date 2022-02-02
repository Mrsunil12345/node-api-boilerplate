'use strict';

//const healthchecksService = require('app/services/healthchecks');
const usersService = require('app/services/users');

const allUsers = (req, res, next) => {
  let userParams = {};

  usersService.getAllUsers(userParams, (err, result) => {
    if (err) {
      return next(err);
    }

    return res.send(result);
  });
};

module.exports = {
  allUsers: allUsers
};
