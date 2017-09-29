require('dotenv').config();
module.exports = function(knex){
  return {
    orderDB: function(ready, submission){
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

          console.log(items)
          knex.insert(items).into('order_items')
          .then((response) => {
            console.log(response)
          })
        })
        })
  }   
}
}
