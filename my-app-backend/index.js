const express = require("express");
const path = require("path");

const app = express();
const sequelize = require("./configs/sequelize");
const User = require("./models/user.model");
const cors = require("cors");
const userRoute = require("./routes/user.route");
const bodyParser = require("body-parser"); // Only if using an older version of Express
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use("", userRoute);
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
