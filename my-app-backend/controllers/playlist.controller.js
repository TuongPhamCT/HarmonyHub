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
    const playlist = await playlistService.updatePlaylistById(req.params.id, req.body);
    res.status(200).json(playlist);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
