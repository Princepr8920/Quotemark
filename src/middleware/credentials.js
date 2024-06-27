const allowedOrigins = require("../config/myOrigins");

function credentials(req, res, next) {
  let origin = req.headers.orgin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
}

module.exports = credentials;
