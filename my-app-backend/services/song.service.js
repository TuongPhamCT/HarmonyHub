const Song = require("../models/song.model");
const path = require("path");

const { getAudioDurationInSeconds } = require("get-audio-duration");

module.exports.createSong = async (songName, artist, songFile, songImage) => {
  let durationInSeconds = await getAudioDurationInSeconds(songFile.path);
  let duration = Math.floor(durationInSeconds); // Cast float to int
  return Song.create({
    name: songName,
    artist: artist,
    duration: duration,
    fileURL: songFile.path,
    image: songImage.path,
  });
};

module.exports.getSongById = async (songId) => {
  return Song.findByPk(songId);
};

function convertBackslashToSlash(filePath) {
  return filePath.replace(/\\/g, "/");
}

function deletePublicFromPath(filePath) {
  return filePath.replace("public/", "");
}

module.exports.changePathOfSongForClient = (song) => {
  song.fileURL = convertBackslashToSlash(song.fileURL);
  song.fileURL = deletePublicFromPath(song.fileURL);
  song.image = convertBackslashToSlash(song.image);
  song.image = deletePublicFromPath(song.image);
  return song;
};
