var Playlist = require("../models/playlist.model");
const Song = require("../models/song.model");
const User = require("../models/user.model");
const sequelize = require("../configs/sequelize");

module.exports.getPlaylistsByUserId = async (userEmail) => {
  const playlists = await Playlist.findAll({
    include: [
      {
        model: User,
        where: { email: userEmail },
        attributes: [], // Exclude user attributes from the result
      },
    ],
  });
  return playlists;
};

module.exports.getPlaylistDetails = async (playlistId) => {
  let playlist = await Playlist.findByPk(playlistId, {
    include: [
      {
        model: Song,
        attributes: ["id", "title", "image"],
        include: [
          {
            model: Album,
            attributes: ["title"], // Assuming the album name is stored in the "title" attribute
          },
        ],
      },
    ],
  });

  if (!playlist) {
    error = new Error("Playlist not found");
    error.status = 404;
    throw error;
  }

  return playlist;
};

module.exports.createPlaylist = async (title, isPublic, userId) => {
  const existingPlaylists = await Playlist.findAll({
    where: { title: title, user_id: userId },
  });
  if (existingPlaylists.length > 0) {
    const error = new Error("Playlist already exists");
    error.status = 409;
    throw error;
  }

  const playlist = await Playlist.create({
    title,
    isPublic,
    user_id: userId,
  });
  return playlist;
};

module.exports.removeSongFromAllPlaylists = async (songId) => {
  try {
    await sequelize.query(`DELETE FROM playlist_song WHERE song_id = :songId`, {
      replacements: { songId },
      type: sequelize.QueryTypes.DELETE,
    });
    console.log(`Song with ID ${songId} removed from all playlists`);
  } catch (error) {
    throw new Error(`Error removing song from playlists: ${error.message}`);
  }
};

module.exports.deletePlaylistById = async (playlistId, userId) => {
  const playlist = await Playlist.findByPk(playlistId);

  if (!playlist) {
    let error = new Error("Playlist not found");
    error.status = 404;
    throw error;
  }

  if (playlist.user_id !== userId) {
    let error = new Error("You don't have permission to delete this playlist");
    error.status = 403;
    throw error;
  }
  await deletePlaylistSongs(playlistId);
  await playlist.destroy();
  return playlist;
};

async function deletePlaylistSongs(playlistId) {
  try {
    await sequelize.query(
      `DELETE FROM playlist_song WHERE playlist_id = :playlistId`,
      {
        replacements: { playlistId },
        type: sequelize.QueryTypes.DELETE,
      }
    );
    console.log(`Songs removed from playlist with ID ${playlistId}`);
  } catch (error) {
    throw new Error(`Error removing songs from playlist: ${error.message}`);
  }
}

module.exports.addSongToPlaylist = async (playlistId, songId, userId) => {
  const playlist = await Playlist.findByPk(playlistId);
  if (!playlist) {
    let error = new Error("Playlist not found");
    error.status = 404;
    throw error;
  }

  if (playlist.user_id !== userId) {
    let error = new Error(
      "You don't have permission to add song to this playlist"
    );
    error.status = 403;
    throw error;
  }

  const song = await Song.findByPk(songId);
  if (!song) {
    let error = new Error("Song not found");
    error.status = 404;
    throw error;
  }

  await playlist.addSong(song);
  return { message: "Song added to playlist successfully" };
};

module.exports.removeSongFromPlaylist = async (playlistId, songId, userId) => {
  // Find the playlist by ID
  const playlist = await Playlist.findByPk(playlistId);
  if (!playlist) {
    const error = new Error("Playlist not found");
    error.status = 404;
    throw error;
  }

  // Check if the user has permission to modify the playlist
  if (playlist.user_id !== userId) {
    const error = new Error(
      "You don't have permission to remove song from this playlist"
    );
    error.status = 403;
    throw error;
  }

  // Find the song in the playlist
  const songs = await playlist.getSongs({ where: { id: songId } });
  if (songs.length === 0) {
    const error = new Error("Song not found in the playlist");
    error.status = 404;
    throw error;
  }

  // Remove the song from the playlist
  await playlist.removeSong(songs[0]);
  return { message: "Song removed from playlist successfully" };
};

module.exports.updatePlaylistById = async (playlistId, {
  title,
  isPublic
}) => {
  const playlist = await Playlist.findByPk(playlistId);
  if (!playlist) {
    const error = new Error("Playlist not found");
    error.status = 404;
    throw error;
  }

  await playlist.update({
    title: title || playlist.title,
    isPublic: isPublic || playlist.isPublic,
  });
  return playlist;
}
