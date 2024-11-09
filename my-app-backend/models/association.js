// associations.js
const Song = require("./song.model");
const Genre = require("./genre.model");
const User = require("./user.model");
//const GenreSong = require("./genreSong.model");

//define the association between Song and Genre(n-n)
Song.belongsToMany(Genre, {
  through: "genre_song",
  as: "genre",
  foreignKey: "genre_id",
});

Genre.belongsToMany(Song, {
  through: "genre_song",
  as: "song",
  foreignKey: "song_id",
});

//define the association between User and Song(1-n)
User.hasMany(Song, {
  foreignKey: "post_user_id",
});
Song.belongsTo(User, {
  foreignKey: "post_user_id",
});
