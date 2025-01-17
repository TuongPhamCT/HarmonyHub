const songService = require("../services/song.service");
const path = require("path");
const fs = require("fs");

const statSync = fs.statSync;
const createReadStream = fs.createReadStream;

module.exports.createSong = async (req, res) => {
  console.log(req.body);
  let songName = req.body.name;
  let artistId = req.body.artistId;
  let songFile = req.files.file ? req.files.file[0] : null;
  let songImage = req.files.image ? req.files.image[0] : null;
  let userId = req.userId;
  console.log(songFile);
  console.log(songImage);

  try {
    await songService.createSong(
      songName,
      artistId,
      songFile,
      songImage,
      userId
    );
    res.status(201).json({ message: "Song created successfully" });
  } catch (error) {
    res.status(400).json({ message: "data incorect format", error });
  }
};

module.exports.getSongById = async (req, res) => {
  let songId = req.params.id;
  let song = await songService.getSongById(songId);
  song = songService.changePathOfSongForClient(song);
  res.json(song);
};

module.exports.playSongById = async (req, res) => {
  let songId = req.params.id;
  let song = await songService.getSongById(songId);

  await songService.addPlayHistory(songId, req.userId, new Date());

  const CHUNK_SIZE = 10 ** 6 / 2;

  const range = req.headers.range || "0";

  const songPath = path.join(__dirname, "..", song.fileURL);

  const audioSize = statSync(songPath).size;

  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, audioSize - 1);
  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${audioSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "audio/mpeg",
    "Transfer-Encoding": "chunked",
  };

  res.writeHead(206, headers);

  const stream = createReadStream(songPath, { start, end });
  stream.pipe(res);
};

module.exports.getMostPlaySongs = async (req, res) => {
  let { startTime, endTime, numberOfSongs } = req.query;

  try {
    let songs = await songService.getMostPlaySongs(
      startTime,
      endTime,
      numberOfSongs
    );
    res.json(songs);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching most played songs", error });
  }
};

module.exports.deleteSongById = async (req, res) => {
  let songId = req.params.id;
  try {
    let song = await songService.getSongById(songId);
    if (song.post_user_id !== req.userId) {
      return res
        .status(403)
        .json({ message: "You don't have permission to delete this song" });
    } else {
      await songService.deleteSong(song);
      res.status(200).json({ message: "Song deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting song", error });
  }
};

module.exports.updateSongById = async (req, res) => {
  const songId = req.params.id;
  const { name, artist } = req.body;
  const songImage = req.files.image ? req.files.image[0] : null;

  let song = await songService.getSongById(songId);
  if (song.post_user_id !== req.userId) {
    return res
      .status(403)
      .json({ message: "You don't have permission to update this song" });
  }

  try {
    await songService.updateSongById(songId, {
      name,
      artist,
      image: songImage ? songImage.path : undefined,
    });
    res.status(200).json("Song updated successfully");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating song", error: error.message });
  }
};
