require('dotenv').config();
module.exports = function(knex){
  return {
    orderDB: function(ready, personOrder){
      console.log('orderDB called, personOrder: ', personOrder)
       
        knex('users').insert({
          email: personOrder.email,
          first_name: personOrder.firstName,
          last_name: personOrder.lastName,
          phone: personOrder.phone
        })
          .then(res => {

            knex('orders').insert({
              user_id: res.rowCount,
              time_ready: ready
            })
            .then(order => {
              console.log("in order_items")
              for (let i in personOrder.items) {
                knex('order_items').insert({ 
                  order_id: res.rowCount,
                  item_id: personOrder.items[i].id,
                  quantity: personOrder.items[i].quantity
                }).then()
              } 
            }) 
          }
        )
      }   
    }
  }
