const pg        = require('pg')
require('dotenv').config();


const client    = new pg.Client({
  user:         process.env.DB_USER,
  password:     process.env.DB_PASS,
  database:     process.env.DB_NAME,
  host:         process.env.DB_HOST,
  port:         process.env.DB_PORT,
  ssl:          process.env.DB_SSL
})


module.exports = function (){

  client.connect((err, db) => {
    if (err) {
      return console.error("Connection Error", err)
    }
  })

  function queryDB () {
    client.query("SELECT * FROM items", (err, result) => {
      if (err) {
        return console.error("error running query", err)
      } else {
        return result.rows
      }
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
