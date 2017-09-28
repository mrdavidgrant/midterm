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
let product4 = {
  id: 4,
  name: faker.commerce.productName(), 
  price: faker.commerce.price(), 
  picture: faker.image.food(), 
  description: faker.commerce.productAdjective()
}
let product5 = {
  id: 5,
  name: faker.commerce.productName(), 
  price: faker.commerce.price(), 
  picture: faker.image.food(), 
  description: faker.commerce.productAdjective()
}
let product6 = {
  id: 6,
  name: faker.commerce.productName(), 
  price: faker.commerce.price(), 
  picture: faker.image.food(), 
  description: faker.commerce.productAdjective()
}
let product7 = {
  id: 7,
  name: faker.commerce.productName(), 
  price: faker.commerce.price(), 
  picture: faker.image.food(), 
  description: faker.commerce.productAdjective()
}
let product8 = {
  id: 8,
  name: faker.commerce.productName(), 
  price: faker.commerce.price(), 
  picture: faker.image.food(), 
  description: faker.commerce.productAdjective()
}
let product9 = {
  id: 9,
  name: faker.commerce.productName(), 
  price: faker.commerce.price(), 
  picture: faker.image.food(), 
  description: faker.commerce.productAdjective()
}
  let product10 = {
  id: 10,
  name: faker.commerce.productName(), 
  price: faker.commerce.price(), 
  picture: faker.image.food(), 
  description: faker.commerce.productAdjective()
}
let product11 = {
  id: 11,
  name: faker.commerce.productName(), 
  price: faker.commerce.price(), 
  picture: faker.image.food(), 
  description: faker.commerce.productAdjective()
}
let product12 = {
  id: 12,
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
        knex('items').insert(product3),
        knex('items').insert(product4),
        knex('items').insert(product5),
        knex('items').insert(product6),
        knex('items').insert(product7),
        knex('items').insert(product8),
        knex('items').insert(product9),
        knex('items').insert(product10),
        knex('items').insert(product11),
        knex('items').insert(product12)
      ]);
    });
};
