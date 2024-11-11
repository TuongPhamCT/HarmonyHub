const Song = require("../models/song.model");
const path = require("path");

const { getAudioDurationInSeconds } = require("get-audio-duration");

module.exports.createSong = async (songName, artist, songFile) => {
  console.log(songName);
  console.log(artist);
  console.log(songFile);
  let filePath = path.join("public\\songs", songFile.filename);
  console.log(filePath);
  let durationInSeconds = await getAudioDurationInSeconds(filePath);
  let duration = Math.floor(durationInSeconds); // Cast float to int
  console.log(duration);
  return Song.create({
    name: songName,
    artist: artist,
    duration: duration,
    fileName: songFile.filename,
  });
};

module.exports.getSongById = async (songId) => {
  return Song.findByPk(songId);
};
