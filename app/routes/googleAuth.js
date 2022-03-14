"use strict";

const express = require('express');
const router = express.Router();
const passport = require('passport');
require('app/middlewares/passport');
const controller = require('app/controllers/googleAuth');

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'Email'] })
);
router.get(
  '/verify/google',
  passport.authenticate('google'),
  controller.google
);

module.exports = router;
