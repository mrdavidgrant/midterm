"use strict"

const express       = require('express')
const routes        = express.Router()
const app           = express();
const VoiceResponse = require('twilio').twiml.VoiceResponse;

require('dotenv').config();

module.exports = function(helper, knex) {
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  var twilio = require('../lib/twilio-helper')

  routes
    .get("/", (req, res) => {
      helper.query((result) => {
        res.render('index', {result: result})
      })

    })

    .post("/order", (req, res) => {
      helper.insert(req.body)
      .then((results) => {
        twilio.messageCall(results)
      })

      res.send('').status(201);
    })

    .post("/order/:id/voice", (req, res) => {
      helper.get(req.params.id)
      .then((results) => {
        twilio.messageContent(results)
      })
    })

    .post("/order/:id", (req, res) => {
      twilio.messageSMS(req.body.Digits)
      helper.insertReady(req.body.Digits, req.params.id)
    })

  return routes

}
