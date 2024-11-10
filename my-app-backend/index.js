const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser"); // Only if using an older version of Express

const userRoute = require("./routes/user.route");
const songRoute = require("./routes/song.route");
const sequelize = require("./configs/sequelize");
const Song = require("./models/song.model");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use("", userRoute);
app.use("", songRoute);

require("./sync");

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
