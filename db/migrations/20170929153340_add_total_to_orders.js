
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders', function(table) {
      table.increments('id').primary().unsigned();
      table.string('time_ready');
      table.integer('user_id').unsigned().index();
      table.foreign('user_id').references('users.id');
      table.integer('total');
    })
  ])
};

exports.down = function(knex, Promise) {
  
};
