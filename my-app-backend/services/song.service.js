const Song = require("../models/song.model");
const path = require("path");
const sequelize = require("../configs/sequelize");

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

module.exports.getMostPlaySongs = async (startTime, endTime, numberOfSongs) => {
  try {
    const songs = await sequelize.query(
      `SELECT s.id, s.name, s.duration, s."fileURL", s.image, COUNT(*) as playCount 
       FROM play_history ph 
       JOIN song s ON ph.song_id = s.id 
       WHERE ph."playAt" BETWEEN :startTime AND :endTime 
       GROUP BY s.id 
       ORDER BY playCount DESC 
       LIMIT :numberOfSongs`,
      {
        replacements: { startTime, endTime, numberOfSongs },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return songs;
  } catch (error) {
    throw new Error(`Error fetching most played songs: ${error.message}`);
  }
};
