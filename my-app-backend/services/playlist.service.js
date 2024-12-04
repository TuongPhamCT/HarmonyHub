var Playlist = require("../models/playlist.model");
const Song = require("../models/song.model");
const User = require("../models/user.model");
const sequelize = require("../configs/sequelize");

module.exports.getPlaylistsByUserId = async (userEmail) => {
  try {
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
  } catch (error) {
    throw new Error(`Error fetching playlists: ${error.message}`);
  }
};

module.exports.getPlaylistDetails = async (playlistId) => {
  try {
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
      throw new Error("Playlist not found");
    }

    return playlist;
  } catch (error) {
    throw new Error(`Error fetching playlist details: ${error.message}`);
  }
};

module.exports.createPlaylist = async (title, isPublic, userId) => {
  try {
    const playlist = await Playlist.create({
      title,
      isPublic,
      user_id: userId,
    });
    return playlist;
  } catch (error) {
    throw new Error(`Error creating playlist: ${error.message}`);
  }
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
    throw new Error("Playlist not found");
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
  try {
    const playlist = await Playlist.findByPk(playlistId);
    if (!playlist) {
      throw new Error("Playlist not found");
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
      throw new Error("Song not found");
    }

    await playlist.addSong(song);
    return { message: "Song added to playlist successfully" };
  } catch (error) {
    throw new Error(`Error adding song to playlist: ${error.message}`);
  }
};

module.exports.removeSongFromPlaylist = async (playlistId, songId, userId) => {
  try {
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

    // Find the song by ID
    const song = await Song.findByPk(songId);
    if (!song) {
      const error = new Error("Song not found");
      error.status = 404;
      throw error;
    }

    // Remove the song from the playlist
    await playlist.removeSong(song);
    return { message: "Song removed from playlist successfully" };
  } catch (error) {
    throw new Error(`Error removing song from playlist: ${error.message}`);
  }
};
