// IMPORTING THE REQUIRED MODULES FOR EXPRESS
const express = require("express");
const app = express();

var events = require("events");
var eventEmitter = new events.EventEmitter();




eventEmitter.on("doSome", par => {
  console.log("event triggered succesfully." + par);
});


let ejs = require("ejs");
var bodyParser = require("body-parser");
var cookieSession = require("cookie-session");
var Message = require("./models/message");

const hostname = "127.0.0.1";
const port = 8000;

// TEMPLATES GENERATOR/MOTOR
app.set("view engine", "ejs");

// MIDDLEWARE

app.use("/assets", express.static("public"));

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
// parse application/json
app.use(bodyParser.json());

//middleware for session treatement
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    secure: false,

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

app.use(require("./middlewares/flash"));

// ROUTES
app.get("/", (request, response) => {
  //   response.send("somthing" + request);
  Message.all(function(messages) {
    response.render("pages/index", {
      messages: messages
    });
  });
});

app.get("/messages/:id", (req, res) => {
  Message.find(req.params.id, function(message) {
    res.render("message/show", {
      message: message
    });
  });
});

app.post("/", (request, response) => {
  if (request.body.msgId === undefined) {
    //   response.send("somthing" + request);
    if (request.body.message == "" || request.body.message == undefined) {
      // response.render("pages/index", {
      //   error: "vous n'avez pas entré un msg 😔 :("
      // });
      request.flash("error", "vous n'avez pas entré un msg 😔 :(");
      response.redirect("/");
    } else {
      Message.create(request.body.message, function() {
        console.log("added to db");
        request.flash("success", "Thank You! 😀 :(");
        response.redirect("/");
      });
    }
  } else {
    Message.delete(request.body.msgId, function() {
      request.flash("success", "comment Deleted ! 💓😀🙈 :(");
      response.redirect("/");
    });
  }

  eventEmitter.emit("doSome");
  // console.clear();
  // console.log(request.session);
  // console.log(request.body);""
});

app.listen(port, err => {
  console.log("listening on " + port);
});
