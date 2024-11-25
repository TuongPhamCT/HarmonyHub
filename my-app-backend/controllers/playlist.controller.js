const Playlist = require("../models/playlist.model");
const playlistService = require("../services/playlist.service");

module.exports.getAllPlaylists = async (req, res) => {
  try {
    const playlists = await playlistService.getPlaylistsByUserId(req.userId);
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
