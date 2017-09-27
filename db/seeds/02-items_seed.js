                //items up
                  //id (pk)
                  //name (string)
                  //price (float)
                  //picture (string)
                  //description (string)

                  
var faker = require('faker');
let product1 = {
  id: 1,
  name: faker.commerce.productName(), 
  price: faker.commerce.price(), 
  picture: faker.image.food(), 
  description: faker.commerce.productAdjective()
}
let product2 = {
  id: 2,
  name: faker.commerce.productName(), 
  price: faker.commerce.price(), 
  picture: faker.image.food(), 
  description: faker.commerce.productAdjective()
}
let product3 = {
  id: 3,
  name: faker.commerce.productName(), 
  price: faker.commerce.price(), 
  picture: faker.image.food(), 
  description: faker.commerce.productAdjective()
}
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('items').insert(product1),
        knex('items').insert(product2),
        knex('items').insert(product3)
      ]);
    });
};
