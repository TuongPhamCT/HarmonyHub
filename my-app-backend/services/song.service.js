const Song = require("../models/song.model");
const fs = require("fs").promises;
const path = require("path");
const sequelize = require("../configs/sequelize");
const playlistService = require("./playlist.service");

const { getAudioDurationInSeconds } = require("get-audio-duration");

module.exports.createSong = async (
  songName,
  artistId,
  songFile,
  songImage,
  userId
) => {
  let durationInSeconds = await getAudioDurationInSeconds(songFile.path);
  let duration = Math.floor(durationInSeconds); // Cast float to int
  return Song.create({
    name: songName,
    duration: duration,
    fileURL: songFile.path,
    image: songImage.path,
    artist_id: artistId,
    post_user_id: userId,
  });
};

module.exports.getSongById = async (songId) => {
  return Song.findByPk(songId);
};

module.exports.deleteSong = async (song) => {
  await playlistService.removeSongFromAllPlaylists(song.id);
  await deleteFile(song.fileURL);
  await deleteFile(song.image);
  return Song.destroy({ where: { id: song.id } });
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
  const songs = await sequelize.query(
    `SELECT s.id, s.name, s.artist, s.duration, s."fileURL", s.image, s.album_id, s."createdAt", s.post_user_id, COUNT(*) as "playCount" 
       FROM play_history ph 
       JOIN song s ON ph.song_id = s.id 
       WHERE ph."playAt" BETWEEN :startTime AND :endTime 
       GROUP BY s.id 
       ORDER BY "playCount" DESC 
       LIMIT :numberOfSongs`,
    {
      replacements: { startTime, endTime, numberOfSongs },
      type: sequelize.QueryTypes.SELECT,
    }
  );
  return songs;
};

module.exports.addPlayHistory = async (songId, userId, time) => {
  return sequelize.query(
    `INSERT INTO play_history (song_id, user_id, "playAt") VALUES (:songId, :userId, :time)`,
    {
      replacements: { songId, userId, time },
      type: sequelize.QueryTypes.INSERT,
    }
  );
};

module.exports.updateSongById = async (songId, songInfo) => {
  return Song.update(songInfo, { where: { id: songId } });
};

async function deleteFile(fileURL) {
  let filePath = path.join(__dirname, "..", fileURL);
  filePath = convertBackslashToSlash(filePath);
  try {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${filePath}`, err);
      } else {
        console.log(`File deleted: ${filePath}`);
      }
    });
  } catch (err) {
    console.error(err);
  }
}
