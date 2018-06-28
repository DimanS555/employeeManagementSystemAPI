let express = require('express');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');
let db = require("./server/config/db");
let router = require("./server/router/index");
let cors = require('cors');
const env = require('./server/config/env');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');

var app = express();

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// Create middleware for checking the JWT
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://${env.AUTH0_DOMAIN}/.well-known/jwks.json'
  }),

  // Validate the audience and the issuer.
  audience: env.AUTH0_AUDIENCE,
  issuer: 'https://${env.AUTH0_DOMAIN}/',
  algorithms: ['RS256']
});

router(app, db, checkJwt, jwtAuthz);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error message
  res.status(err.status || 500);
  res.send({ "Error": err.message });
});

module.exports = app;