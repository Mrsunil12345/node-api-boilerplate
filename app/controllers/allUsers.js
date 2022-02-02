'use strict';

//const healthchecksService = require('app/services/healthchecks');
const allusersModel=require('../models/allUsers')


const allUsers = (req, res, next) => {
  const data=(allusersModel.check());
console.log("inside the controller");
  res.send("send from controller"+data)
};

module.exports = {
  allUsers: allUsers
};
