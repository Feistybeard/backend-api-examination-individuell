const bcryptjs = require("bcryptjs");
const db = require("../utils/db");

function addUser(username, password) {
  const passwordHashed = bcryptjs.hashSync(password, 10);
  const user = {
    username,
    password: passwordHashed,
  };

  return db.users.insert(user);
}

function getUser(userId) {
  return db.users.findOne({ _id: userId });
}

function checkUsername(username) {
  return db.users.findOne({ username });
}

async function checkPassword(password, passwordHashed) {
  return bcryptjs.compareSync(password, passwordHashed);
}

module.exports = { addUser, getUser, checkUsername, checkPassword };
