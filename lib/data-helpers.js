const pg        = require('pg')
require('dotenv').config();


const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig['development']);


module.exports = function (){

  // client.connect((err, db) => {
  //   if (err) {
  //     return console.error("Connection Error", err)
  //   }
  // })

  function queryDB () {
    knex('*').from('items')
    .then((result) => {console.log(result)})
  }

  function closeEverything() {
    client.end()
  }

  return {
    query: queryDB,
    close: closeEverything
  }

}
