'use strict';

// Include core libraries
const express = require('express');
const bodyParser = require('body-parser');
const path=require('path');

const fs = require('fs');

!fs.existsSync(path.normalize(`${__dirname}/node_modules/app`)) ? fs.symlinkSync(path.normalize(`${__dirname}/app`), path.normalize(`${__dirname}/node_modules/app`)) : null;
const healthchecks = require('app/services/healthchecks');
console.log(path.normalize(`${__dirname}/app`));
console.log(`${__dirname}/node_modules/app`);
const app = express();

// Include config files
const config = require('app/configs/config');
const status = require('app/configs/status');
const loggerConfig = require('app/configs/logger');

const isDeveloping = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test');

app.disable('x-powered-by');

// Include middleware
const authsMiddleware = require('app/middlewares/auths');


// Include routers
const healthchecksRouter = require('app/routes/healthchecks');
<<<<<<< HEAD
const googleRoute=require('app/routes/googleAuth')
=======
const usersRouter = require('app/routes/users')
>>>>>>> 7cfe20da884ee4f878d55b7cd743455df4e3aeb9

// Use JSON body parser
app.use(bodyParser.json({
  limit: 1024102420
}));

app.use(bodyParser.urlencoded({
  limit: 1024102420,
  extended: true
}));

// Make DB connections

config.mysqlConnection.connect((err) => {
  if (err) {
    console.log('MySQL connection error: ', err);
  } else {
    console.log('Connected to MySQL DB...');
  }
});
<<<<<<< HEAD

=======
>>>>>>> 7cfe20da884ee4f878d55b7cd743455df4e3aeb9

// Set allowed headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization,User-Agent,X-Auth,X-Version');

  if (isDeveloping) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  next();
});

// Healthcheck routes
<<<<<<< HEAD
//healthchecks.init();
=======
// healthchecks.init();
>>>>>>> 7cfe20da884ee4f878d55b7cd743455df4e3aeb9
app.use('/healthchecks', healthchecksRouter);
app.use('/users', usersRouter)

app.get('/ping', (req, res) => {
  res.send('pong');
});


// Use custom log format
app.use(loggerConfig.customLogFormat);

// Stream logs on screen for non-production
if (isDeveloping) {
  app.use(loggerConfig.devLogStream);
};

// Use middleware
app.use(authsMiddleware);

// Routes
app.use('/auths',googleRoute);
// Catch 404s
app.use((req, res, next) => {
  res.statusCode = 404;
  res.json(status.getStatus('url_missing'));
});

// Global error handler
app.use((err, req, res, next) => {
  if (err) {
    console.log(new Date().toISOString(), err);
  }

  if (err.hasOwnProperty('error')) {
    res.json(err);
  } else {
    let err = status.getStatus('generic_fail');
    res.json(err);
  }
});

app.listen(config.SERVER_PORT, config.SERVER_IP, () => {
  console.log(`########## Environment: ${process.env.NODE_ENV} ##########`);
  console.log(`${new Date()}: Server running on port ${config.SERVER_PORT}...`);
});
