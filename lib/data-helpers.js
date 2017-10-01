const pg        = require('pg')
require('dotenv').config();


const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig['production']);


module.exports = function (knex){



  function insertUser (submission) {
    knex('users')
    .returning('id')
    .insert(submission.user, 'id')
    .then(result => {
      submission.user.id = result[0]
    })
  }

  function insertOrder (submission){
    knex('users').where({ email: submission.user.email }).select('id')
    .then((response) => {
      if (response[0]) {
        return (response[0].id)
      } else {
        insertUser(submission)
      }
    })
    .then((response) => {
      let order = {
        user_id: response,
        total: submission.total
      }
      knex('orders')
      .returning('id')
      .insert( order )
      .then((response) => {
        let items = []
        for (key of submission.items) {
          let item = {
            order_id: response[0].id,
            item_id: parseInt(key.id),
            quantity: parseInt(key.quantity)
          }
          items.push(item)
        }
        knex.insert(items)
        .into('order_items')
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
