const pg        = require('pg')
require('dotenv').config();


const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig['development']);



module.exports = function (knex){

  // client.connect((err, db) => {
  //   if (err) {
  //     return console.error("Connection Error", err)
  //   }
  // })

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
    query: queryDB,
    close: closeEverything
  }

}
