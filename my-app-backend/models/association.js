// associations.js
const Song = require("./song.model");
const Genre = require("./genre.model");
const User = require("./user.model");
const Album = require("./album.model");
const Playlist = require("./playlist.model");
//const GenreSong = require("./genreSong.model");

//define the association between Song and Genre(n-n)
Song.belongsToMany(Genre, {
  through: "genre_song",
  as: "song",
  foreignKey: "song_id",
});

Genre.belongsToMany(Song, {
  through: "genre_song",
  as: "genre",
  foreignKey: "genre_id",
});

//define the association between User and Song(1-n)
User.hasMany(Song, {
  foreignKey: "post_user_id",
});
Song.belongsTo(User, {
  foreignKey: "post_user_id",
});

//define the association between User and Song(1-n)
User.hasMany(Song, {
  foreignKey: "artist_id",
});
Song.belongsTo(User, {
  foreignKey: "artist_id",
});

//define the association between User and Album(1-n)
User.hasMany(Album, {
  foreignKey: "artist_id",
});
Album.belongsTo(User, {
  foreignKey: "artist_id",
});

//define the association between Album and Song(1-n)
Album.hasMany(Song, {
  foreignKey: "album_id",
});
Song.belongsTo(Album, {
  foreignKey: "album_id",
});

//define the association between Playlist and Song(n-n)
Song.belongsToMany(Playlist, {
  through: "playlist_song",
  foreignKey: "song_id",
});

Playlist.belongsToMany(Song, {
  through: "playlist_song",
  foreignKey: "playlist_id",
});

//define the association between User and Playlist(1-n)
User.hasMany(Playlist, {
  foreignKey: "user_id",
});
Playlist.belongsTo(User, {
  foreignKey: "user_id",
});
