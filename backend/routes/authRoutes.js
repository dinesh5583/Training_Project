const pool = require("../config/db");
const router = require("express").Router();
const jwtGenerator = require("../utils/jwtgenerator");

router.post("/signup", async (req, res) => {
  try {
    const { admin_name, admin_email, password, role_id, is_active } = req.body;
    const user = await pool.query(
      `select * from admin_tbl where admin_email=$1`,
      [admin_email]
    );
    if (user.rows.length !== 0) {
      return res.status(401).send({ message: "user already exist" });
    }
    const userCreate = await pool.query(
      `insert into admin_tbl(admin_name, admin_email, password, role_id, is_active) 
      values($1,$2,$3,$4,$5) returning *`,
      [admin_name, admin_email, password, role_id, is_active]
    );
    const token = jwtGenerator(userCreate.rows[0].admin_id);
    console.log(token);
    res.status(201).json({
      token: token,
      name: userCreate.rows[0].admin_name,
      admin_id: userCreate.rows[0].admin_id,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "interal server error" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { admin_email, password } = req.body;
    const user = await pool.query(
      `select * from admin_tbl where admin_email=$1`,
      [admin_email]
    );
    if (user.rows.length === 0 || password !== user.rows[0].password) {
      return res.status(401).send({ message: "Invalid username and password" });
    }
    const token = jwtGenerator(user.rows[0].admin_id);
    res.status(201).json({
      token: token,
      name: user.rows[0].admin_name,
      admin_id: user.rows[0].admin_id,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "interal server error" });
  }
});
module.exports = router;
