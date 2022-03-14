"use strict";

const config = {
  SERVER_IP: "0.0.0.0",
  SERVER_PORT: process.env.PORT || 3000,
  clientID:
    "672962432944-0rah4235e139227h8u5ga5d926g055n0.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:3000/auths/verify/google",
};

module.exports = config;
