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
    return new Promise ((resolve, reject) => {

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
          submission.id = parseInt(response)
          let items = []
          for (key of submission.items) {
            let item = {
              order_id: parseInt(response),
              item_id: parseInt(key.id),
              quantity: parseInt(key.quantity)
            }
            items.push(item)
          }
          knex.insert(items)
          .into('order_items')
          .then((response) => {
            resolve (submission)
          })
        })
      })
    })
    }

  function getOrder (id) {
    return new Promise ((resolve, reject) => {
      knex('order_items').innerJoin('items', 'order_items.item_id', '=', 'items.id').where({order_id: id})
      .then((results) => {
        resolve(results)
      })
    })
  }

  function insertReady(time, order) {
    knex('orders').update({time_ready: time}).where('id', '=', order)
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
    insertReady: insertReady,
    insert: insertOrder,
    get: getOrder,
    query: queryDB,
    close: closeEverything
  }

}
