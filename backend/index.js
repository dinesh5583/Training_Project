const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const logger = require("morgan");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger("dev"));

app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);


app.listen(5000, () => {
  console.log(`server is runnung on port 5000`);
});
