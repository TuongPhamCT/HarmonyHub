const songService = require("../services/song.service");
const path = require("path");
const fs = require("fs");

const statSync = fs.statSync;
const createReadStream = fs.createReadStream;

module.exports.createSong = async (req, res) => {
  console.log(req.body);
  let songName = req.body.name;
  let artist = req.body.artist;
  let songFile = req.files.file ? req.files.file[0] : null;
  let songImage = req.files.image ? req.files.image[0] : null;
  console.log(songFile);
  console.log(songImage);

  try {
    await songService.createSong(songName, artist, songFile, songImage);
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

  const CHUNK_SIZE = 10 ** 6 / 2;

  const range = req.headers.range || "0";

  const audioSize = statSync(song.path).size;

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

  const stream = createReadStream(filePath, { start, end });
  stream.pipe(res);
};
