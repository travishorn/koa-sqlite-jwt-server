const path = require('path');
const knex = require('knex');

module.exports = knex({
  client: 'sqlite3',
  connection: { filename: path.join(__dirname, 'db.sqlite') },
  useNullAsDefault: true,
});
