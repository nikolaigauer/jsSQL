const pg = require("pg");
const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : setting.password,
    database : setting.database
  }
});


// knex.select('name').from('artists').asCallback(function (err, result) {
//   if (err) { throw err; }

//   console.log(result[0]['name']);
// });


knex.schema.createTable('albums', function (table) {

  table.increments('id');
  table.string('title', 50).notNullable();
  table.integer('year').notNullable();
  table.integer('artist_id').references('artists.id').onDelete('cascade');
  table.timestamps();

});
