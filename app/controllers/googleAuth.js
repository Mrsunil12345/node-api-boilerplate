"use strict";

const googleService = require('app/services/googleAuth');

const google = (req, res, next) => {
  let googleParams = {};
  googleParams.id = req.user._json.sub;
  googleParams.first_name = req.user._json.given_name;
  googleParams.last_name = req.user._json.family_name;
  googleParams.email = req.user._json.email;
  googleParams.provider = req.user.provider;

  googleService.google(googleParams, (err, result) => {
    if (err) {
      return next(err);
    }

    return res.json(result);
  });
};

module.exports = {
  google: google,
};
