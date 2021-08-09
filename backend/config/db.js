const pg = require("pg");
const pool = new pg.Pool({
  host: "localhost",
  port: "5432",
  password: "root",
  database: "product",
  user: "postgres",
});
module.exports = pool;
