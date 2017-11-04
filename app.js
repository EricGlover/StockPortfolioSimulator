const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

//ROUTERS
const index = require("./routes/index");
const apiRouter = require("./routes/api");
// const users = require('./routes/users');

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//heroku build path

// app.use("/users", users);
app.use("/api", apiRouter);
/* serve the bundle */
router.get("/", function(req, res, next) {
  // res.end("../client/build/index.html");
  console.log("serving bundle");
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
app.use(express.static(path.join(__dirname, "./client/build/static")));

// app.use("*", index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
