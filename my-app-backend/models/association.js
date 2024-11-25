// associations.js
const Song = require("./song.model");
const Genre = require("./genre.model");
const User = require("./user.model");
const Album = require("./album.model");
const Playlist = require("./playlist.model");
const PlayHistory = require("./playHistory.model");
//const GenreSong = require("./genreSong.model");

//define the association between Song and Genre(n-n)
Song.belongsToMany(Genre, {
  through: "genre_song",
  as: "song",
  timestamps: false,
  foreignKey: "song_id",
});

Genre.belongsToMany(Song, {
  through: "genre_song",
  as: "genre",
  timestamps: false,
  foreignKey: "genre_id",
});

//define the association between User and Song(1-n)
User.hasMany(Song, {
  foreignKey: "post_user_id",
  timestamps: false,
});
Song.belongsTo(User, {
  foreignKey: "post_user_id",
  timestamps: false,
});

//define the association between User and Song(1-n)
User.hasMany(Song, {
  foreignKey: "artist_id",
  timestamps: false,
});
Song.belongsTo(User, {
  foreignKey: "artist_id",
  timestamps: false,
});

//define the association between User and Album(1-n)
User.hasMany(Album, {
  foreignKey: "artist_id",
  timestamps: false,
});
Album.belongsTo(User, {
  foreignKey: "artist_id",
  timestamps: false,
});

//define the association between Album and Song(1-n)
Album.hasMany(Song, {
  foreignKey: "album_id",
  timestamps: false,
});
Song.belongsTo(Album, {
  foreignKey: "album_id",
  timestamps: false,
});

// Define the association between Playlist and Song (n-n)
Song.belongsToMany(Playlist, {
  through: {
    model: "playlist_song",
  },
  timestamps: false,
  foreignKey: "song_id",
});

Playlist.belongsToMany(Song, {
  through: {
    model: "playlist_song",
  },
  timestamps: false,
  foreignKey: "playlist_id",
});

//define the association between User and Playlist(1-n)
User.hasMany(Playlist, {
  foreignKey: "user_id",
  timestamps: false,
});
Playlist.belongsTo(User, {
  foreignKey: "user_id",
  timestamps: false,
});

//define the association between User and PlayHistory(1-n)
User.hasMany(PlayHistory, {
  foreignKey: "user_id",
  timestamps: false,
});
PlayHistory.belongsTo(User, {
  foreignKey: "user_id",
  timestamps: false,
});

//define the association between Song and PlayHistory(1-n)
Song.hasMany(PlayHistory, {
  foreignKey: "song_id",
  timestamps: false,
});
PlayHistory.belongsTo(Song, {
  foreignKey: "song_id",
  timestamps: false,
});
