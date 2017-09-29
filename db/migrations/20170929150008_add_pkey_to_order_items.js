
exports.up = function(knex, Promise) {
  return Promise.all ([
    knex.schema.dropTable('order_items');
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
  return Promise.all ([
    knex.schema.dropTable('order_items');
    knex.schema.createTable('order_items', function(table){
      table.integer('order_id').unsigned();
      table.foreign('order_id').references('orders.id');

      table.integer('item_id').unsigned();
      table.foreign('item_id').references('items.id');
      table.integer('quantity');

    })
  ])
};
