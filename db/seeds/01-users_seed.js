                //users up
                  //id (pk)
                  //email (string)
                  //first_name (string)
                  //last_name (string)
                  //phone (string)

var faker = require('faker');
let user1 = {
  id: 1,
  email: faker.internet.email(), 
  first_name: faker.name.firstName(), 
  last_name: faker.name.lastName(), 
  phone: faker.phone.phoneNumber()
};

let user2 = {
  id: 2,
  email: faker.internet.email(), 
  first_name: faker.name.firstName(), 
  last_name: faker.name.lastName(), 
  phone: faker.phone.phoneNumber()
};
let user3 = {
  id: 3,
  email: faker.internet.email(), 
  first_name: faker.name.firstName(), 
  last_name: faker.name.lastName(), 
  phone: faker.phone.phoneNumber()
};
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        
          knex('items').insert(user1),
          knex('items').insert(user2),
          knex('items').insert(user3)
      ]);
    });
};
