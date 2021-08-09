const router = require("express").Router();
const pool = require("../config/db");

router.get("/list", async (req, res) => {
  try {
    const user = await pool.query(
      `select admin_id, admin_name, admin_email, role_name, is_active, a.created_at 
            from admin_tbl a inner join role_tbl r on a.role_id=r.role_id`
    );
    res.status(201).json(user.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "interal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await pool.query(`select * from admin_tbl where admin_id=$1`, [
      id,
    ]);
    res.status(201).send(user.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/add", async (req, res) => {
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
    res.status(201).json({ user: userCreate.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "interal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { admin_name, admin_email, password, role_id, is_active } = req.body;
    const user = await pool.query(`select * from admin_tbl where admin_id=$1`, [
      id,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).send({ message: "user does not exist" });
    }
    // const saltRound = 10;
    // const salt = await bcrypt.genSalt(saltRound);
    // const bcryptPassword = await bcrypt.hash(user_password, salt);
    const updateUser = await pool.query(
      `update admin_tbl set admin_name=$1,admin_email=$2,password=$3, role_id=$4, is_active=$5 where 
              admin_id=$6 returning *`,
      [admin_name, admin_email, password, role_id, is_active, id]
    );
    res.status(201).send(updateUser.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query(`select * from admin_tbl where admin_id=$1`, [
      id,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).send({ message: "user does not exist" });
    }
    const deleteUser = await pool.query(
      `delete from admin_tbl where admin_id=$1`,
      [id]
    );
    res.status(200).json({ message: "user deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: " Internal server error" });
  }
});

module.exports = router;
