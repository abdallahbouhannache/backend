var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "m123",
  database: "nodedb"
});

connection.connect((err) => {
  if (err) {
    console.log(err.stack);
  }
  console.log('connected successfully threadId=' + connection.threadId);
});


module.exports = connection;