"use strict";
require('dotenv').config();

const PORT        = process.env.PORT;
const ENV         = process.env.ENV;
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const path        = require('path')

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sass({
  src: path.join(__dirname + "/styles"),
  dest: path.join(__dirname + "/public/styles"),
  debug: true,
  outputStyle: 'expanded',
  prefix: '/styles'
}));
app.use(express.static("public"));

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));

// Home page
const helper = require('./lib/data-helpers')(knex)

const routes = require('./routes/routes')(helper, knex)

app.use("/", routes)

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
