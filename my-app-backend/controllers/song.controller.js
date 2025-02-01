const songService = require("../services/song.service");
const path = require("path");
const fs = require("fs");
const Genre = require("../models/genre.model");
const Song = require("../models/song.model");
const { getAudioDurationInSeconds } = require("get-audio-duration");

const statSync = fs.statSync;
const createReadStream = fs.createReadStream;

module.exports.createSong = async (req, res) => {
  console.log(req.body);
  let songName = req.body.name;
  let genres = req.body.genres.map(Number);
  let songFile = req.files.file ? req.files.file[0] : null;
  let songImage = req.files.image ? req.files.image[0] : null;
  let userId = req.userId;
  let lyric = req.body.lyric;
  let durationInSeconds = await getAudioDurationInSeconds(songFile.path);
  let duration = Math.floor(durationInSeconds); // Cast float to int

  try {
    // Validate request
    if (!songName || !genres || !songFile) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Check if genres exist
    const genreDocs = await Genre.findAll({
      where: {
        id: genres,
      },
    });
    if (genreDocs.length !== genres.length) {
      return res.status(400).send({ message: "Some genres do not exist" });
    }

    // Create a new song
    const song = await Song.create({
      name: songName,
      fileURL: `/public/songs/${songFile.filename}`,
      image: `/public/images/${songImage.filename}`,
      duration: duration,
      lyric: lyric,
      createdAt: new Date(),
      updatedAt: new Date(),
      post_user_id: userId,
      playCount: 0,
    });

    // Associate genres with the song
    await song.setGenres(genreDocs);

    res
      .status(201)
      .json({ message: "Song created successfully", song: song.toJSON() });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Error creating song", error });
  }
};

module.exports.getSongById = async (req, res) => {
  let songId = req.params.id;
  try {
    let song = await songService.getSongById(songId);
    song = songService.changePathOfSongForClient(song);
    res.json(song);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Song not found with id: " + songId, error });
  }
};

module.exports.playSongById = async (req, res) => {
  let songId = req.params.id;
  let song = await songService.getSongById(songId);

  await songService.addPlayHistory(songId, req.userId, new Date());
  song.playCount += 1;
  await song.save();

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
