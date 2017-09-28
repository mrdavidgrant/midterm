"use strict"

const express       = require('express')
const routes        = express.Router()
const app           = express();

require('dotenv').config();

module.exports = function(helper, knex) {
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  var submitHelper = require('../dataHelperSubmitOrder')(knex)


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
      console.log(req.body, 'end of req.body')
      submitHelper.orderDB(1, "soon", req.body)
      res.send('').status(201);
    })

    .put("/order/:id", (req, res) => {
      console.log(req.path)
      res.redirect('/')
    })


  return routes

}
