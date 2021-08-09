const router = require("express").Router();
const pool = require("../config/db");

router.get("/list", async (req, res) => {
  try {
    const cat = await pool.query(
      `select * from category_tbl`
    );
    res.status(201).json(cat.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "interal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const cat = await pool.query(`select * from category_tbl where cat_id=$1`, [
      id,
    ]);
    res.status(201).send(cat.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { cat_name,created_by} = req.body;
    const cat = await pool.query(
      `select * from category_tbl where cat_name=$1`,
      [cat_name]
    );
    if (cat.rows.length !== 0) {
      return res.status(401).send({ message: "Category name already exist" });
    }
    const catCreate = await pool.query(
      `insert into category_tbl(cat_name,created_by) 
        values($1,$2) returning *`,
      [cat_name,created_by]
    );
    res.status(201).json({ cat: catCreate.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "interal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {  cat_name,created_by } = req.body;
    const cat = await pool.query(`select * from category_tbl where cat_id=$1`, [
      id,
    ]);
    if (cat.rows.length === 0) {
      return res.status(401).send({ message: "Category does not exist" });
    }
    // const saltRound = 10;
    // const salt = await bcrypt.genSalt(saltRound);
    // const bcryptPassword = await bcrypt.hash(user_password, salt);
    const updateCat = await pool.query(
      `update category_tbl set cat_name=$1,created_by=$2 where 
              cat_id=$3 returning *`,
      [cat_name,created_by,id]
    );
    res.status(201).send(updateCat.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query(`select * from category_tbl where cat_id=$1`, [
      id,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).send({ message: "Category does not exist" });
    }
    const deleteUser = await pool.query(
      `delete from category_tbl where cat_id=$1`,
      [id]
    );
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: " Internal server error" });
  }
});

module.exports = router;
