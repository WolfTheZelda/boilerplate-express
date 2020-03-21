var express = require("express");
var app = express();

// --> 7)  Mount the Logger middleware here
app.use((req, res, next) => {
  var log = req.method + " " + req.path + " - " + req.ip;
  console.log(log);
  next();
});

// --> 11)  Mount the body-parser middleware  here
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
app.get("/hello-express", (req, res) => {
  res.send("Hello Express");
});

/** 3) Serve an HTML file */
app.get("/", (req, res) => {
  var indexPath = __dirname + "/views/index.html";

  res.sendFile(indexPath);
});

/** 4) Serve static assets  */
app.use(express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */
app.get("/hello-json", (req, res) => {
  let message = "Hello json";
  res.json({ message });
});

/** 6) Use the .env file to configure the app */
app.get("/json", (req, res) => {
  let message = "Hello json";
  res.json({ message : process.env.MESSAGE_STYLE == "uppercase" ? message.toUpperCase() : message });
});

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

/** 8) Chaining middleware. A Time server */
app.get("/now", (req, res, next) => {
  req.now = new Date().toGMTString();
  next();
}, (req, res) => {
  res.json({time: req.now});
});

/** 9)  Get input from client - Route parameters */
app.get("/user/:userId/book/:bookId", (req, res) => {
  res.json({userId: req.params.userId, bookId: req.params.bookId});
});
app.get("/:word/echo", (req, res) => {
  res.json({echo: req.params.word});
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", (req, res) => {
  res.json({name: req.query.first + " " + req.query.last})
});

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

/** 12) Get data form POST  */
app.post("/name", (req, res) => {
  res.json({name: req.body.first + " " + req.body.last})
});

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
