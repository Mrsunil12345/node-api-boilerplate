'use strict';

const express = require('express');
const router = express.Router();
console.log("inside the routes")
const controller = require('app/controllers/users');

router.get('/', controller.allUsers);


module.exports = router;
