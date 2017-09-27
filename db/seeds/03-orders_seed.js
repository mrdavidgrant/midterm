                //orders up
                  //id (pk)
                  //user_id FK (users id)
                  //time_ready (string)
var faker = require('faker');
let order1 = {
  time_ready: `READY 1 MIN`, 
  id: 1,
  user_id:1
};
let order2 = {
  time_ready: `READY 2 MIN`, 
  id: 2,
  user_id:2
};
let order3 = {
  time_ready: `READY 3 MIN`, 
  id: 3,
  user_id:3
};
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('orders').insert(order1),
        knex('orders').insert(order2),
        knex('orders').insert(order3)
      ]);
    });
};
