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
      console.log('Order received')
      helper.insert(req.body)
      .then((results) => {
        console.log('placing call')
        twilio.messageCall(results)
      })
      // twilio.messageSMS(req.body)

      res.send('').status(201);
    })

    .post("/voice/:id", (req, res) => {
      console.log('call coming in')
      helper.get(req.params.id)
      .then((response) => {
        const twiml = new VoiceResponse()
        const gather = twiml.gather({
          numDigits: 2,
          action:'/gather'
        })
        gather.say('This is a call from the online ordering system.')
        gather.say('A new order has been placed.')
        for (item in response.items) {
          gather.say(`${item} Quantity ${response.items[item].quantity}`)
        }
        gather.say('Please enter how many minutes till this order will be ready')

        response.type('application/json');
        console.log(twiml.toString())
      })
    })

    // .post("/order/:id")

  return routes

}
