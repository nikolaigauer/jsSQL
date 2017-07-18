const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people", (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Found one person(s) with the name " + process.argv[2] + result); //output: 1
    client.end();
  });
});
