const pg        = require('pg')
require('dotenv').config();


const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig);


module.exports = function (knex){

  function insertOrder (ready, submission){
    console.log("submission", submission)
    knex('users')
    .returning('id')
    .insert(submission.user, 'id')
    .then((response) => {
      let order = {
        user_id: response[0],
        time_ready: ready,
        total: submission.total
      }
      knex('orders')
      .returning('id')
      .insert( order )
      .then((response) => {
        let items = []
        for (key of submission.items) {
          let item = {
            order_id: response[0],
            item_id: parseInt(key.id),
            quantity: parseInt(key.quantity)
          }
          items.push(item)
        }

        knex.insert(items).into('order_items')
        .then((response) => {
          return
        })
      })
    })
  }


  function queryDB (callback) {
    
    knex('*').from('items')
    .then((result) => {
      callback(result)
    })
  }

  function closeEverything() {
    client.end()
  }

  return {
    insert: insertOrder,
    query: queryDB,
    close: closeEverything
  }

}
