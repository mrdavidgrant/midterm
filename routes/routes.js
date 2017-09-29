"use strict"

const express       = require('express')
const routes        = express.Router()
const app           = express();
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const urlencoded    = require('body-parser').urlencoded;

require('dotenv').config();

module.exports = function(helper, knex) {
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  var submitHelper = require('../dataHelperSubmitOrder')(knex)
  var twilioHelper = require('../twilioServerStuff')

  routes
    .get("/", (req, res) => {
      helper.query((result) => {
        console.log(result)
        res.render('index', {result: result})
      })

    })


    .get("/order/:id", (req, res) => {
      console.log(req.path)
      res.redirect('/')
    })

    .post("/order", (req, res) => {
      twilioHelper.messageSMS(req.body.user)
      twilioHelper.messageCall(req.body.user)

      res.send('').status(201);
    })

    .put("/order/:id", (req, res) => {
      console.log(req.path)
      res.redirect('/')
    })
    // .post('/voice', (request, response) => {
    //   // Use the Twilio Node.js SDK to build an XML response
    //   const twiml = new VoiceResponse();

    //   // Use the <Gather> verb to collect user input
    //   const gather = twiml.gather({numDigits: 1});
    //   gather.say('For sales, press 1. For support, press 2.');

    //   // If the user doesn't enter input, loop
    //   twiml.redirect('/voice');

    //   // Render the response as XML in reply to the webhook request
    //   response.type('text/xml');
    //   response.send(twiml.toString());
    // });
  return routes

}
