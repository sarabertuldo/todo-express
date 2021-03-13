const pool = require("../config/mysql.conf");

// each function will have a try{} catch(err){}
async function add(res, todo) {
  try {
    // check that they gave us a userID
    // check that they gave us a task between 1 and 40 characters
    if (
      !todo.task ||
      todo.task.length < 1 ||
      todo.task.length > 40 ||
      isNaN(todo.userID)
    ) {
      // messsage below throws to catch and returns "Invalid data provided"
      throw "Invalid data provided";
    }
    // todo.completed = !todo.completed? false: true;
    // todo.dueDate = todo.dueDate || null or Date.now();
    // try to add it
    await pool.query(
      "INSERT INTO todos(user_ID, task, completed) VALUES (?, ?, false)",
      // these will replace the ?, ?
      [todo.userID, todo.task]
    );
    // await will automatically throw to catch built in the function
    // if successful, send a success message
    return res.send({
      success: true,
      data: "Successfully added the todo",
      error: null,
    });
  } catch (err) {
    return res.send({ success: false, data: null, error: err });
    // send an error message
  }
}

async function remove(res, id) {
  try {
    // try to delete
    // const [todos] = await pool.query("DELETE...") would work, too
    await pool.query("DELETE FROM todos WHERE todos.id = ?", [id]);
    // if successful, send a success message
    return res.send({
      success: true,
      data: "Successfully removed the todo",
      error: null,
    });
  } catch (err) {
    // send an error message
    return res.send({ success: false, data: null, error: err });
  }
}

async function edit(res, todo) {
  try {
    // check for valid info
    if (
      isNaN(todo.id) ||
      !todo.task ||
      todo.task.length < 1 ||
      todo.task.length > 40 ||
      typeof todo.completed !== "boolean"
    ) {
      throw "Invalid data provided";
    }
    // try to update it
    await pool.query("UPDATE todos SET task = ?, completed = ? WHERE id = ?", [
      todo.task,
      todo.completed,
      todo.id,
    ]);
    // if successful, send a success message
    return res.send({
      success: true,
      data: "Successfully edited the todo",
      error: null,
    });
  } catch (err) {
    // send an error message
    return res.send({ success: false, data: null, error: err });
  }
}

async function all(res, id) {
  try {
    // get all of them
    // we need const [todos] here
    const [todos] = await pool.query("SELECT * FROM todos");
    // if successful, send a success message
    return res.send({
      success: true,
      data: todos,
      error: null,
    });
  } catch (err) {
    // send an error message
    return res.send({ success: false, data: null, error: err });
  }
}

async function byUserID(res, userID) {
  try {
    // get by userID
    // const [rows, fields] = useState("");
    const [
      todos,
    ] = await pool.query("SELECT * FROM todos WHERE todos.user_ID = ?", [
      userID,
    ]);
    // send success message
    return res.send({
      success: true,
      data: "Successfully added the todo",
      error: null,
    });
  } catch (err) {
    // send an error message
    return res.send({ success: false, data: null, error: err });
  }
}

// can export each function one at a time
// module.exports.add = add;
// module.exports.remove = remove;

module.exports = { add, remove, edit, all, byUserID };

// let add = 1
// let remove = 2
// let update = 3
