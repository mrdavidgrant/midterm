require('dotenv').config();
module.exports = function(knex){
  return {
    orderDB: function(ready, personOrder){
      console.log('orderDB called')

      knex('users').max('id').then((userMax) =>{
        console.log(Number(userMax[0].max) + 1);
        knex('users').insert({
          email: personOrder.email,
          first_name: personOrder.firstName,
          last_name: personOrder.lastName,
          phone: personOrder.phone
        })
          .then(res => {

            knex('orders').insert({
              user_id: (Number(userMax[0].max) + 1),
              time_ready: ready
            })
            .then(order => {
              knex('orders').max('id').then(result => {
                
                for (let i in personOrder.items) {
                  console.log('result', result)
                  knex('order_items').insert({ 
                    order_id: (Number(result[0].max) + 1),
                    item_id: personOrder.items[i].id,
                    quantity: personOrder.items[i].quantity
                  })
                } 
              })
            }) 
          }
        )
      })   
    }
  }
}