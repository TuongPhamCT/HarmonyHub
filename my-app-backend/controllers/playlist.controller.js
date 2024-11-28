const { Model } = require("sequelize");
const Playlist = require("../models/playlist.model");
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
    res
      .status(500)
      .json({ message: "Error creating playlist", error: error.message });
  }
};
