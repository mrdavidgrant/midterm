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

    .post("/:id/voice", (req, res) => {
      helper.get(req.params.id)
      .then((results) => {
        const twiml = new VoiceResponse()
        const gather = twiml.gather({
          numDigits: 2,
          // action:'/gather'
        })
        console.log('This is the working order: ', results)
        gather.say('This is a call from the online ordering system.')
        gather.say('A new order has been placed.')
        gather.say(`${results[0].name}`)
        gather.say('Please enter how many minutes till this order will be ready')

        res.type('text/xml');
        res.send(twiml.toString());
      })
    })

    // .post("/order/:id")

  return routes

}
