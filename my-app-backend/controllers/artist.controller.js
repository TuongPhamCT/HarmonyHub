var artistService = require("../services/artist.service");

module.exports.getArtistById = async (req, res) => {
  const artistId = req.params.id;
  const artistInfo = await artistService.getArtistInfoById(artistId);
  res.json(artistInfo);
};
