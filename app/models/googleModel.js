"use strict";

const squel = require("squel");

const config = require("app/configs/config");

const utilsService = require("app/services/utils");

const check = (params, callback) => {
  const checkQuery = squel.select().field("now()");

  config.mysqlConnection.query(checkQuery.toString(), (err, result) => {
    if (err) {
      return callback(err);
    }

    return callback(null, utilsService.sanitizeSqlResult(result));
  });
  return callback(null, true);
};

const getUser = (params, callback) => {
  let getUserQuery = squel
    .select()
    .field("id")
    .field("email")
    .field("first_name")
    .field("last_name")
    .from("users")
    .where("email=?", params.email);


  config.mysqlConnection.query(getUserQuery.toString(), (err, result) => {
    if (err) {

      return callback(err);
    }

    return callback(null, utilsService.sanitizeSqlResult(result));
  });
};

const insertUser = (params, callback) => {
  let insertUserQuery = squel
    .insert()
    .into("users")
    .set("first_name", params.first_name)
    .set("last_name", params.last_name)
    .set("email", params.email);
  config.mysqlConnection.query(insertUserQuery.toString(), (err, result) => {
    if (err) {
      return callback(err);
    }
    return callback(null, utilsService.sanitizeSqlResult(result));
  });
};

const createSession = (params, callback) => {

  let createSessionQuery = squel
    .insert()
    .into("sessions")
    .set("user_id", params.userID)
    .set("token", params.token)
    .set("expiry", params.expiry);
  config.mysqlConnection.query(createSessionQuery.toString(), (err, result) => {
    if (err) {
      return callback(err);
    }
    return callback(null, utilsService.sanitizeSqlResult(result.insertId));
  });
};

const getUserSessionProviderInfo = (params, callback) => {
  let getUserSessionProviderInfo = squel
    .select()
    .from("users", "u")
    .join(squel.select().from("sessions"), "s", "s.user_id = u.id");
  params.sessionId
    ? getUserSessionProviderInfo.where("s.id=?", params.sessionId)
    : null;
  params.email
    ? getUserSessionProviderInfo.where("u.email=?", params.email)
    : null;


  config.mysqlConnection.query(
    getUserSessionProviderInfo.toString(),
    (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, utilsService.sanitizeSqlResult(result[0]));
    }
  );
};

const getProvider = (params, callback) => {
  let getProviderQuery = squel
    .select()
    .field("id")
    .field("provider")
    .field("code")
    .from("providers")
    .where("provider=?", params.provider);

  config.mysqlConnection.query(getProviderQuery.toString(), (err, result) => {
    if (err) {
      return callback(err);
    }
    return callback(null, utilsService.sanitizeSqlResult(result[0]));
  });
};

const getSession = (params, callback) => {

  let getSessionQuery = squel
    .select()
    .field("id")
    .field("token")
    .field("expiry")
    .from("sessions")
    .where("user_id=?", params.userID)
    .where("expiry > now()");

  config.mysqlConnection.query(getSessionQuery.toString(), (err, result) => {
    if (err) {
      return callback(err);
    }
    console.log(result);
    return callback(null, utilsService.sanitizeSqlResult(result));
  });
};

const updateSession = (params, callback) => {

  const updateSessionQuery = squel
    .update()
    .table("sessions")
    .set("token", params.token)
    .set("expiry", params.expiry)
    .where("user_id=?", params.userID);

  config.mysqlConnection.query(updateSessionQuery.toString(), (err, result) => {
    if (err) {
      return callback(err);
    }

    return callback(null, utilsService.sanitizeSqlResult(result));
  });
};

module.exports = {
  check: check,
  getUser: getUser,
  insertUser: insertUser,
  createSession: createSession,
  getUserSessionProviderInfo: getUserSessionProviderInfo,
  getProvider: getProvider,
  getSession: getSession,
  updateSession: updateSession,
};
