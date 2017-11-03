const express = require("express");
const router = express.Router();

/* serve the bundle */
router.get("/*", function(req, res, next) {
  res.end("../client/build/index.html");
});

module.exports = router;
