const Datastore = require("nedb-promises");

let db = {};
db.users = new Datastore({ filename: "db/users.db", autoload: true });
db.notes = new Datastore({ filename: "db/notes.db", autoload: true });

module.exports = db;
