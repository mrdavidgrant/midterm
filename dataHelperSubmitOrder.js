require('dotenv').config();

module.exports = function(knex){
  return {
    orderDB: function(user, ready, reqbody){
      console.log('orderDB called')
      knex('orders').returning('*').insert({
        user_id: user,
        time_ready: ready
      })
      .then(order => {
        console.log('order', order)
        knex('orders').count('id').then(result => {
            for (let i in reqbody.items) {
              knex('order_items').insert({ 
                order_id: result[0].count,
                item_id: reqbody.items[i].id,
                quantity: reqbody.items[i].quantity
              }).then()
            }
          }
        )
      })    
    }
  }
}