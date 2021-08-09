const router = require("express").Router();
const pool = require("../config/db");

router.get("/list", async (req, res) => {
  try {
    const cat = await pool.query(
      `select pro_id, pro_name, pro_desc,is_active,a.created_by,a.created_at ,cat_name,parent_id,a.created_at 
      from product_tbl a inner join category_tbl r on a.cat_id=r.cat_id`
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
    const cat = await pool.query(`select * from product_tbl where pro_id=$1`, [
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
    const { pro_name,pro_desc,cat_id,is_active,created_by} = req.body;
    const cat = await pool.query(
      `select * from product_tbl where pro_name=$1`,
      [pro_name]
    );
    if (cat.rows.length !== 0) {
      return res.status(401).send({ message: "Product name already exist" });
    }
    const catCreate = await pool.query(
      `insert into product_tbl(pro_name,pro_desc,cat_id,is_active,created_by) 
        values($1,$2,$3,$4,$5) returning *`,
      [pro_name,pro_desc,cat_id,is_active,created_by]
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
    const { pro_name,pro_desc,cat_id,is_active,created_by} = req.body;
    const cat = await pool.query(`select * from product_tbl where pro_id=$1`, [
      id,
    ]);
    if (cat.rows.length === 0) {
      return res.status(401).send({ message: "product does not exist" });
    }
    // const saltRound = 10;
    // const salt = await bcrypt.genSalt(saltRound);
    // const bcryptPassword = await bcrypt.hash(user_password, salt);
    const updateCat = await pool.query(
      `update product_tbl set pro_name=$1,pro_desc=$2,cat_id=$3,is_active=$4,
        created_by=$5 where pro_id=$6 returning *`,
      [pro_name,pro_desc,cat_id,is_active,created_by,id]
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
    const user = await pool.query(`select * from product_tbl where pro_id=$1`, [
      id,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).send({ message: "Produce does not exist" });
    }
    const deleteUser = await pool.query(
      `delete from Product_tbl where pro_id=$1`,
      [id]
    );
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: " Internal server error" });
  }
});

module.exports = router;
