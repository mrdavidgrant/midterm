require('dotenv').config();
module.exports = function(knex){
  return {
    orderDB: function(ready, submission){
      console.log("submission", submission)
      knex('users').insert(submission.user, 'id')
      .returning('id')
      .then((response) => {
        knex('orders').insert({
          user_id: response[0],
          time_ready: ready,
          total: submission.total
        }, 'id')
        .returning('id')
      .then((response) => {

        for (key of submission.items) {
          let item = {
            order_id: response[0],
            item_id: parseInt(key.id),
            quantity: parseInt(key.quantity)
          }
          console.log(item)
          knex.insert(item).into('order_items')
        }
      })
      .then((response) =>{
        knex('order_items').select()
        .then(response => {
          console.log(response)
        })
      })
    })
  }   
}
}
