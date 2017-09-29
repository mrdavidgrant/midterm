exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.increments('id').primary().unsigned();
      table.string('email');
      table.string('first_name');
      table.string('last_name');
      table.string('phone');
    }),
    knex.schema.createTable('orders', function(table) {
      table.increments('id').primary().unsigned();
      table.string('time_ready');
      table.integer('user_id').unsigned().index();
      table.foreign('user_id').references('users.id');
      table.integer('total');
      table.timestamp('placed').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('items', function(table){
      table.increments('id').primary().unsigned();
      table.string('name');
      table.float('price');
      table.string('picture');
      table.string('description');
    }),
    knex.schema.createTable('order_items', function(table){
      table.integer('order_id').unsigned();
      table.foreign('order_id').references('orders.id');
      table.integer('item_id').unsigned();
      table.foreign('item_id').references('items.id');
      table.integer('quantity');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('order_items'),
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('items')
  ])
};   