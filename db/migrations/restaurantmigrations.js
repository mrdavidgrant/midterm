exports.up = function(knex, Promise) {
  return Promise.all([
                //users up
                  //id (pk)
                  //email (string)
                  //first_name (string)
                  //last_name (string)
                  //phone (string)
    knex.schema.createTable('users', function(table){
      table.increments('id').primary().unsigned();
      table.string('email');
      table.string('first_name');
      table.string('last_name');
      table.string('phone');
    }),
                //orders up
                  //id (pk)
                  //time_ready (string)
                  //user_id FK (users id)
    knex.schema.createTable('orders', function(table){
      table.increments('id').primary().unsigned();
      table.string('time_ready');
      table.integer('user_id').unsigned().index();
      table.foreign('user_id').references('users.id');
    }),
                //items up
                  //name (pk)
                  //price (float)
                  //picture (string)
                  //description (string)
    knex.schema.createTable('items', function(table){
      table.increments('name').primary().unsigned();
      table.float('price');
      table.string('picture');
      table.string('description');
    }),
                //order_items up
                  //order_id (pk, fk -> orders(id)
                  //item_id (pk, fk -> items(name))
                  //quantity integer
    knex.schema.createTable('order_items', function(table){
      table.increments('order_id').primary().unsigned();
      table.integer('order_id').unsigned().index();
      table.foreign('order_id').references('orders.id');

      table.increments('item_id').primary().unsigned();
      table.integer('item_id').unsigned().index();
      table.foreign('item_id').references('items.name');
      table.integer('quantity');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('items'),
    knex.schema.dropTable('order_items')
  ])
};   