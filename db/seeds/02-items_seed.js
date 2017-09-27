                //items up
                  //id (pk)
                  //name (string)
                  //price (float)
                  //picture (string)
                  //description (string)

                  
var faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        for (let i = 0; i < 3; i++){ 
          let product = {
            name: faker.commerce.productName(), 
            price: faker.commerce.price(), 
            picture: faker.image.food(), 
            description: faker.commerce.productAdjective()
          };
          product[id] = i;
          knex('items').insert(product),
        }
      ]);
    });
};
