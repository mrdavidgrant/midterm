                //order_items up
                  //order_id (pk, fk -> orders(id)
                  //item_id (pk, fk -> items(name))
                  //quantity integer
var faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('order_items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        for (let i = 0; i < 3; i++){ 
          let order_items = {
            quantity: i, 
          };
          order_items[order_id] = i;
          order_items[item_id] = i;
          knex('items').insert(order_items),
        }
      ]);
    });
};
