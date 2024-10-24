const express = require("express");
const app = express();
const sequelize = require("./configs/sequelize");
const User = require("./models/user.model");
const cors = require("cors");

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  //test db connection
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
  // Sync all models with the database
  sequelize
    .sync({ force: true }) // force: true will drop the table if it already exists (use cautiously)
    .then(() => {
      console.log("Database & tables created!");
    })
    .catch((err) => console.error("Error creating tables:", err));
  //test server
  console.log("Server is running on port 5000");
});