const pg = require("pg");
const settings = require("./settings"); // settings.json
const nameInput = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((error) => {
  if (error) {
    return console.error("Connection Error", error);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [nameInput], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    if (result.rowCount != 0) {
      for (var i = 0; i < result.rows.length; i++) {
        var dob = String(result.rows[i].birthdate);
        console.log("Searching...");
        console.log("Found " + (i + 1) + " person(s) with the name " + "'" + nameInput + "':");
        console.log("- " + result.rows[i].id + ": " + result.rows[i].first_name, result.rows[i].last_name + ", born " + "'" + dob.substring(0,15) + "'");
      }
    } else {
      console.log("No one by that name in our database")
    }
    client.end();
  });
});
