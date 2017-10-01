"use strict"

const express       = require('express')
const routes        = express.Router()
const app           = express();
const VoiceResponse = require('twilio').twiml.VoiceResponse;

require('dotenv').config();

module.exports = function(helper, knex) {
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  var twilio = require('../twilioServerStuff')

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
      // twilio.messageSMS(req.body)

      res.send('').status(201);
    })

    .post("/order/:id/voice", (req, res) => {
      helper.get(req.params.id)
      .then((results) => {
        console.log('These are the results: \n', results)
        let body = `This is a call from the online ordering system.  A new order has been placed for `
        // for (item in results) {
        //    body += `quantity ${results[item].quantity} of ${results[item].name}, `
        // }
        const twiml = new VoiceResponse()
        const gather = twiml.gather({
          numDigits: 2,
          action:`/order/${req.params.id}`
        })
        console.log('This is the working order: ', results)
        gather.say(body)
        gather.say('Please enter how many minutes till this order will be ready')
        response.hangup
        res.type('text/xml');
        res.send(twiml.toString());
      })
    })

    .post("/order/:id", (req, res) => {
      console.log('This is the req format: ', req.body.Digits)
      helper.insertReady(req.body.digits, req.params.id)
      twilio.messageSMS(req.body.Digits)
    })

  return routes

}
