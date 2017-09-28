
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', function (table) {
      table.integer('total');
      table.boolean('paid').default(false);
      table.timestamp('created_at').default(knex.fn.now())
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', function(table) {
      table.dropColumn('total');
      table.dropColumn('paid');
      table.dropColumn('created_at');
})])
};
