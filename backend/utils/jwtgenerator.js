const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(id) {
  if (!id) {
    return;
  }
  const payload = {
    id: id,
  };
  return jwt.sign(payload, process.env.jwtsecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;
