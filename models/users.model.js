const bcrypt = require("bcrypt");
const pool = require("../config/mysql.conf");

function isInvalid(val, min, max) {
  return !val || val.length < min || val > max;
}

async function signUp(res, username, password) {
  try {
    if (isInvalid(username, 8, 16) || isInvalid(password, 8, 20)) {
      throw "Invalid Data Provided";
    }
    let [
      user,
    ] = await pool.query("SELECT * FROM users WHERE users.username = ?", [
      username,
    ]);
    if (user.length > 0) {
      throw "Username is already taken";
    }
    const encrypted = await bcrypt.hash(password, 8);
    await pool.query("INSERT INTO users (username, password) VALUES (?,?)", [
      username,
      encrypted,
    ]);
    return res.send({
      success: true,
      data: "Successfully signed up!",
      error: null,
    });
  } catch (err) {
    return res.send({ success: false, data: null, error: err });
  }
}

async function login(res, username, password) {
  try {
    if (isInvalid(username, 8, 16) || isInvalid(password, 8, 20)) {
      throw "Invalid Data Provided";
    }
    // check the database for the username provided
    let [
      users,
    ] = await pool.query("SELECT * FROM users WHERE users.username = ?", [
      username,
    ]);
    // if no user exists, send that response
    if (users.length === 0) {
      throw "Invalid username or password";
    }
    // if it does
    // check the password with bcrypt
    const match = await bcrypt.compare(password, users[0].password);
    // if they don't match, send them away
    if (!match) {
      throw "Invalid password";
    }
    // if they do, let them in
    res.send({
      success: true,
      data: { username: users[0].username },
      error: null,
    });
  } catch (err) {
    return res.send({ success: false, data: null, error: err });
  }
}

module.exports.signUp = signUp;
module.exports.login = login;

// tackle the posts for homework
