"use strict"

const express       = require('express')
const routes        = express.Router()
const app           = express();

require('dotenv').config();
// var knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host     : process.env.DB_HOST,
//     user     : process.env.DB_USER,
//     password : process.env.DB_PASS,
//     database : process.env.DB_NAME
//   },
// });
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

    // .post("/order", (req, res) => {
    //   var insert = submitHelper.orderDB(1, "soon");
    //   console.log(insert);
    //   insert.then((results) => {
    //     knex('orders').count('id').then(result => {
    //       for(let i in req.body.items){
    //         submitHelper.ordItemDB(result[0].count, req.body.items[i].id, req.body.items[i].quantity)
    //       }
    //     });        
    //   });
    //   console.log(req.body)

    //   //2

    //   res.render('confirmation', { order: req.body })
    // })    
    .post("/order", (req, res) => {

      console.log(req.body)
      submitHelper.orderDB(1, "soon", req.body)
      //2

      res.render('confirmation', { order: req.body })
    })

    .put("/order/:id", (req, res) => {
      console.log(req.path)
      res.redirect('/')
    })


  return routes

}