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
        let body = `This is a call from the online ordering system.  A new order has been placed for `
        for (let item in results) {
           body += `quantity ${results[item].quantity} of ${results[item].name}, `
        }
        const twiml = new VoiceResponse()
        const gather = twiml.gather({
          numDigits: 2,
          action:`/order/${req.params.id}`,
          finishOnKey: '#',
          voice: 'alice'
        })
        gather.say(body, {voice: 'alice'})
        gather.say('Please enter how many minutes till this order will be ready',{voice: 'alice'})
        twiml.say('Thank you, the customer will be notified', {voice: 'alice'})
        twiml.hangup()
        res.type('text/xml');
        res.send(twiml.toString());
      })
    })

    .post("/order/:id", (req, res) => {
      twilio.messageSMS(req.body.Digits)
      helper.insertReady(req.body.Digits, req.params.id)
    })

  return routes

}
