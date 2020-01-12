const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");
const url = require("url");
const hostname = "127.0.0.1";
const port = 8000;
const mimeTypes = {
  html: "text/html",
  jpeg: "image/jpeg",
  jpg: "image/jpg",
  png: "image/png",
  js: "text/javascript",
  css: "text/css"
};
// video: "video/mp4"

/* COPYING FILE USING CREATEREADSTREAM AND CREATEWRITESTREAM */
let localFile = "./tube.mp4";
let read = fs.createReadStream("./tube.mp4");
let write = fs.createWriteStream("./cptube.mp4");

// fs.stat(file, (err, stat) => {
//   let total = stat.size;
//   let progress = 0;

//   read.on("data", chunck => {
//     progress += chunck.length;
//     console.log(
//       "readingprogress:" + Math.round((progress * 100) / total) + "%"
//     );
//   });
//   read.pipe(write);

//   write.on("finish", () => {
//     console.log("end-write");
//   });
// });

// JUST NORMAL TEXT BEING SENT BACK FROM THE SERVER
// var serv = http.createServer((req, resp) => {
//   resp.writeHead(200, { "Content-Type": "text/plain" });
//   var q = url.parse(req.url, true).query;
//   var txt = q.year + " " + q.month;
//   resp.write("txt");
//   resp.end();
// });
// serv.listen(port);
// console.log("Server plain text listening on port :" + port);

// A JSON FILE BEING SENT TO THE CLIENT
const jsonfile = {
  id: 01,
  name: "abdo",
  date: "12/12/1955",
  sessionN: "1536sd",
  filenames: ["first", "second", "third", "down"]
};
// var serv2 = http.createServer((req, resp) => {
//   resp.writeHead(200, { "Content-Type": "text/json" });
//   resp.end(JSON.stringify(jsonfile));
// });
// let port1 = port + 1;

// serv2.listen(port1);
// console.log("Server plain text listening on port :" + port1);

// HERE WERE SENDING THE INDEX.HTML FILE TO CLIENT AS REQUESTED
const server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname;
  console.log(`Request for ${pathname} received`);
  if (pathname == "/") {
    pathname = "/index.html";
  }

  // if (pathname == "/contact") {
  //   pathname = "/contact.html";
  // }
  // if (pathname == "/about") {
  //   pathname = "/about.html";
  // }

  fs.readFile("./" + pathname.substr(1), (err, data) => {
    if (err) {
      console.error(err);
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("404 - file not found");
    } else {
      res.writeHead(200, { "Content-Type": mimeTypes });
      res.write(data);
      // res.writeHead(200, head);
      // fs.createReadStream(localFile).pipe(res);
      // res.write(req);
    }
    res.end();
  });
});

// HERE WE READ THE FILESTATSYNC

// const range = req.headers.range;
var fileSize = null;
fs.stat(localFile, (err, state) => {
  if (err) {
    console.log(err);
  }
  fileSize = state.size;
  console.log(state);
});

const head = {
  "Content-Length": fileSize,
  "Content-Type": "video/mp4"
};

res.end();

// let port2 = port + 5;
// server.listen(port2);
// console.log("Server plain text listening on port :" + port2);

// ..............
//
