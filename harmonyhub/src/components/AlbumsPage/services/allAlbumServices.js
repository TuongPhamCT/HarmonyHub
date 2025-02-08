import { shuffleArray } from "../../../services/arrayService";

export const loadAllNewReleaseAlbums = (albums) => {
  // Sắp xếp mảng albums theo releaseDate từ mới nhất đến cũ nhất
  albums.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  
  // Trả về 6 album đầu tiên trong mảng đã sắp xếp
  return albums.length > 50 ? albums.slice(0, 50) : albums;
}

export const loadAllTopAlbums = (albums) => {
  const newAlbums = shuffleArray(albums);
  return newAlbums.length > 50 ? newAlbums.slice(0, 50) : newAlbums;
}