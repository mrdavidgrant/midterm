                //orders up
                  //id (pk)
                  //user_id FK (users id)
                  //time_ready (string)
var faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        for (let i = 0; i < 3; i++){ 
          let order = {
            time_ready: `READY ${i} MIN`, 
          };
          order[id] = i;
          order[user_id] = i;
          knex('items').insert(order),
        }
      ]);
    });
};
