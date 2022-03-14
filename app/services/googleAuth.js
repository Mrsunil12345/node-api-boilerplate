"user strict";

const status = require('app/configs/status');

const utilsService = require('app/services/utils');

const async = require('async');

const googleModel = require('app/models/googleModel');

const google = (params, callback) => {
  async.waterfall(
    [
      (cb) => {
        const googleParams = {};
        googleParams.first_name = params.first_name;
        googleParams.last_name = params.last_name;
        googleParams.email = params.email;
        googleParams.id = params.id;

        googleModel.getUser(googleParams, (err, result) => {
          if (err) {
            return cb(err);
          }
          return cb(null, result);
        });
      },
      (User, cb) => {
        if (User.length === 0) {
          async.waterfall(
            [
              (cb1) => {
                const googleParams = {};
                googleParams.first_name = params.first_name;
                googleParams.last_name = params.last_name;
                googleParams.email = params.email;
                googleParams.id = params.id;
                googleModel.insertUser(params, (err, result) => {
                  if (err) {
                    return cb1(err);
                  }
                  return cb1(null, result);
                });
              },
              (insertId, cb1) => {
                const googleParams = {};
                googleParams.token = (Math.random() * 1e32).toString(16);
                googleParams.userID = insertId.insertId;
                googleParams.expiry = utilsService
                  .addDays(new Date(), 60)
                  .toISOString();
                googleModel.createSession(googleParams, (err, result) => {
                  if (err) {
                    return cb1(err);
                  }
                  return cb1(null, result);
                });
              },
              (sessionInsertId, cb1) => {
                const googleParams = {};
                googleParams.sessionId = sessionInsertId;
                googleModel.getUserSessionProviderInfo(
                  params,
                  (err, result) => {
                    if (err) {
                      return cb1(err);
                    }

                    return cb1(null, result);
                  }
                );
              },
              (userSession, cb1) => {
                const googleParams = {};
                googleParams.provider = params.provider;
                googleModel.getProvider(googleParams, (err, result) => {
                  if (err) {
                    return cb1(err);
                  }
                  let response = status.getStatus("success");
                  response.data = {};
                  response.data.session = {};
                  response.data.session.id = userSession.id;
                  response.data.session.token = userSession.token;
                  response.data.session.expiry = userSession.expiry;

                  response.data.user = {};
                  response.data.user.id = userSession.user_id;
                  response.data.user.first_name = userSession.first_name;
                  response.data.user.last_name = userSession.last_name;
                  response.data.user.email = userSession.email;

                  response.data.provider = {};
                  response.data.provider.id = result.id;
                  response.data.provider.provider = result.provider;
                  response.data.provider.code = result.code;

                  return cb1(null, response);
                });
              },
            ],
            (err, result) => {
              if (err) {
                return cb(err);
              }
              return cb(null, result);
            }
          );
        }
        if (User.length > 0) {
          async.waterfall(
            [
              (cb1) => {
                const googleParams = {};
                googleParams.userID = User[0].id;
                googleModel.getSession(googleParams, (err, result) => {
                  if (err) {
                    return cb1(err);
                  }
                  return cb1(null, result, User);
                });
              },
              (session, User, cb1) => {
                if (session.length === 0) {
                  async.waterfall(
                    [
                      (cb2) => {
                        const googleParams = {};
                        googleParams.token = (Math.random() * 1e32).toString(
                          16
                        );
                        googleParams.userID = User[0].id;
                        googleParams.expiry = utilsService
                          .addDays(new Date(), 60)
                          .toISOString();
                        googleModel.updateSession(
                          googleParams,
                          (err, result) => {
                            if (err) {
                              return cb2(err);
                            }

                            return cb2(null, User[0].email);
                          }
                        );
                      },
                      (userEmail, cb2) => {
                        const googleParams = {};
                        googleParams.email = userEmail;
                        googleModel.getUserSessionProviderInfo(
                          params,
                          (err, result) => {
                            if (err) {
                              return cb2(err);
                            }

                            return cb2(null, result);
                          }
                        );
                      },
                      (userSession, cb2) => {
                        const googleParams = {};
                        googleParams.provider = params.provider;
                        googleModel.getProvider(googleParams, (err, result) => {
                          if (err) {
                            return cb1(err);
                          }
                          let response = status.getStatus("success");
                          response.data = {};
                          response.data.session = {};
                          response.data.session.id = userSession.id;
                          response.data.session.token = userSession.token;
                          response.data.session.expiry = userSession.expiry;

                          response.data.user = {};
                          response.data.user.id = userSession.user_id;
                          response.data.user.first_name =
                            userSession.first_name;
                          response.data.user.last_name = userSession.last_name;
                          response.data.user.email = userSession.email;

                          response.data.provider = {};
                          response.data.provider.id = result.id;
                          response.data.provider.provider = result.provider;
                          response.data.provider.code = result.code;

                          return cb2(null, response);
                        });
                      },
                    ],
                    (err, result) => {
                      if (err) {
                        return cb1(err);
                      }
                      return cb1(null, result);
                    }
                  );
                }
                if (!session.length == 0) {
                  async.waterfall(
                    [
                      (cb2) => {
                        const googleParams = {};
                        googleParams.email = User[0].email;
                        googleModel.getUserSessionProviderInfo(
                          params,
                          (err, result) => {
                            if (err) {
                              return cb2(err);
                            }
                            return cb2(null, result);
                          }
                        );
                      },
                      (userSession, cb2) => {
                        const googleParams = {};
                        googleParams.provider = params.provider;
                        googleModel.getProvider(googleParams, (err, result) => {
                          if (err) {
                            return cb1(err);
                          }
                          let response = status.getStatus("success");
                          response.data = {};
                          response.data.session = {};
                          response.data.session.id = userSession.id;
                          response.data.session.token = userSession.token;
                          response.data.session.expiry = userSession.expiry;

                          response.data.user = {};
                          response.data.user.id = userSession.user_id;
                          response.data.user.first_name =
                            userSession.first_name;
                          response.data.user.last_name = userSession.last_name;
                          response.data.user.email = userSession.email;

                          response.data.provider = {};
                          response.data.provider.id = result.id;
                          response.data.provider.provider = result.provider;
                          response.data.provider.code = result.code;

                          return cb2(null, response);
                        });
                      },
                    ],
                    (err, result) => {
                      if (err) {
                        return cb1(err);
                      }
                      return cb1(null, result);
                    }
                  );
                }
              },
            ],
            (err, result) => {
              if (err) {
                return cb(err);
              }
              return cb(null, result);
            }
          );
        }
      },
    ],
    (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    }
  );
};


module.exports = {
  google: google,
};
