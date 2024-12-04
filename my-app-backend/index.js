const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser"); // Only if using an older version of Express

const authRoute = require("./routes/auth.route");
const songRoute = require("./routes/song.route");
const albumRoute = require("./routes/album.route");
const artistRoute = require("./routes/artist.route");
const playlistRoute = require("./routes/playlist.route");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use("", authRoute);
app.use("", songRoute);
app.use("", albumRoute);
app.use("", artistRoute);
app.use("", playlistRoute);

require("./sync");

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
