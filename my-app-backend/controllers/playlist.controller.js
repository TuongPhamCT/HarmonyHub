const { Model } = require("sequelize");
const Playlist = require("../models/playlist.model");
const Song = require("../models/song.model");
const { Op } = require("sequelize");
const playlistService = require("../services/playlist.service");

module.exports.getAllPlaylists = async (req, res) => {
  try {
    const playlists = await playlistService.getPlaylistsByUserId(req.userEmail);
    res.json(playlists);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching playlists", error: error.message });
  }
};

module.exports.getPlaylistById = async (req, res) => {
  const playlistId = req.params.id;
  try {
    const playlist = await playlistService.getPlaylistById(playlistId);
    res.json(playlist);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching playlist", error: error.message });
  }
};

module.exports.createPlaylist = async (req, res) => {
  const { title, isPublic } = req.body;
  try {
    const playlist = await playlistService.createPlaylist(
      title,
      isPublic,
      req.userId
    );
    res.status(201).json({ message: "Create playlist successfully", playlist });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports.deletePlaylistById = async (req, res) => {
  let playlistId = req.params.id;
  let userId = req.userId;
  try {
    await playlistService.deletePlaylistById(playlistId, userId);
    res
      .status(200)
      .json({ message: "Delete playlist successfully", playlistId });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports.addSongToPlaylist = async (req, res) => {
  const playlistId = req.params.id;
  const { songId } = req.body;
  const userId = req.userId;
  try {
    const result = await playlistService.addSongToPlaylist(
      playlistId,
      songId,
      userId
    );
    res.status(200).json(result);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: "Error adding song to playlist", error: error });
  }
};

module.exports.removeSongFromPlaylist = async (req, res) => {
  const playlistId = req.params.id;
  const { songId } = req.body;
  userId = req.userId;
  try {
    await playlistService.removeSongFromPlaylist(playlistId, songId, userId);
    res
      .status(200)
      .json({ message: "Song removed from playlist successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports.updatePlaylistById = async (req, res) => {
  try {
    const playlist = await playlistService.updatePlaylistById(
      req.params.id,
      req.userId,
      req.body
    );
    res.status(200).json(playlist);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports.getSongsInPlaylist = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "name",
      order = "asc",
      search = "",
    } = req.query;

    const playlistId = req.params.id;

    // Create a regex for case-insensitive search
    const searchRegex = `%${search}%`;

    // Base where condition
    const whereCondition = {
      name: {
        [Op.iLike]: searchRegex,
      },
    };

    // Add genre filtering if genreId is provided
    const includeCondition = playlistId
      ? [
          {
            model: Playlist,
            where: { id: playlistId },
            through: { attributes: [] }, // Exclude junction table attributes
          },
        ]
      : [];

    // Find songs with search, sorting, pagination, and optional genre filtering
    const songs = await Song.findAll({
      where: whereCondition,
      include: includeCondition,
      order: [[sortBy, order.toUpperCase()]],
      offset: (page - 1) * limit,
      limit: Number(limit),
    });

    // Get total count for pagination with genre filtering
    const totalSongs = await Song.count({
      where: whereCondition,
      include: includeCondition,
    });

    res.status(200).send({
      songs,
      totalPages: Math.ceil(totalSongs / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving songs.",
    });
  }
};
