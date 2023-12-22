/**
 * Required External Modules
 */
const express = require("express");
const homeRT = require("./routes/homeRT");
const saveHS = require("./routes/saveHS_RT");
const getHS = require("./routes/getHS_RT");
const resetHS = require("./routes/resetHS");

/**
 *  App Configuration
 */
const app = express();
const formidableMiddleware = require("express-formidable");
const cors = require("cors");

// handling cors errors
app.use(cors());
// parsing request data body
app.use(formidableMiddleware());
/**
 * Routes Definitions
 */
app.use("/", homeRT);
app.use("/save_hs", saveHS);
app.use("/get_hs", getHS);
app.use("/reset_hs", resetHS);

// error handling
// 404 Not found page errors
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// chatch all other system errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

module.exports = app;
