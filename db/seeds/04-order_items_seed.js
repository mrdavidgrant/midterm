                //order_items up
                  //order_id (pk, fk -> orders(id)
                  //item_id (pk, fk -> items(name))
                  //quantity integer
var faker = require('faker');
let order_items1 = {
  quantity: 1,
  item_id: 1,
  order_id: 1 
};
let order_items2 = {
  quantity: 2,
  item_id: 2,
  order_id: 2 
};
let order_items3 = {
  quantity: 3,
  item_id: 3,
  order_id: 3 
};
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('order_items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('order_items').insert(order_items1),
        knex('order_items').insert(order_items2),
        knex('order_items').insert(order_items3)
      ]);
    });
};
