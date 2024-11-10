const songService = require("../services/song.service");

module.exports.createSong = async (req, res) => {
  console.log(req.body);
  var songName = req.body.name;
  var artist = req.body.artist;
  var songFile = req.file;

  try {
    await songService.createSong(songName, artist, songFile);
    res.status(201).json({ message: "Song created successfully" });
  } catch (error) {
    res.status(400).json({ message: "data incorect format", error });
  }
};
