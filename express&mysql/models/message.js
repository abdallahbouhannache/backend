let connection = require("../config/db");
var subDays = require("date-fns/subDays");
var formatDistance = require("date-fns/formatDistance");

class Message {
  constructor(row) {
    this.row = row;
  }

  get id() {
    return this.row.id;
  }
  get content() {
    return this.row.msg;
  }
  get created_at() {
    let v = formatDistance(new Date(), this.row.time);
    // console.log(v);
    return v;
  }

  static create(content, cb) {
    connection.query(
      "INSERT INTO messages SET msg=?,time=?",
      [content, new Date()],
      function(error, rst, rows) {
        if (error) throw error;
        cb();
      }
    );
  }

  static delete(cmntId, cb) {
    connection.query("DELETE FROM messages WHERE id=?", cmntId, function(
      error,
      rows
    ) {
      if (error) throw error;
      cb();
    });
  }

  static all(cb) {
    connection.query("SELECT * FROM messages", function(error, rows) {
      if (error) throw error;
      // console.log(rslt);
      cb(rows.map(row => new Message(row)));

      // let v = formatDistance(subDays(new Date(), 0), new Date());
    });
  }

  static find(id, cb) {
    connection.query("SELECT * FROM messages WHERE id=?", id, function(er, rw) {
      if (er) throw er;
      cb(new Message(rw[0]));
    });
  }
}

module.exports = Message;
