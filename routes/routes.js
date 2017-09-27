"use strict"

const express       = require('express')
const routes        = express.Router()
const app           = express();

module.exports = function(helper) {
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  
  
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
      console.log(req.path)
      res.redirect('/')
    })

    .put("/order/:id", (req, res) => {
      console.log(req.path)
      res.redirect('/')
    })


  return routes

}