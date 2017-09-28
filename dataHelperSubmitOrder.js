require('dotenv').config();
var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  },
});
function insertOrderIntoDB(){

  knex('orders').insert({
    id: 4,
    user_id: 1,
    time_ready: '4 minutes'
  })
  .then(
    (result) => console.log(result)
  )
}

module.exports = {
  orderDB: insertOrderIntoDB
}

insertOrderIntoDB();