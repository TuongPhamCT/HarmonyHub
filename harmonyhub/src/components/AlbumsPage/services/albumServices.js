import { shuffleArray } from "../../../services/arrayService";

export const loadPreviewNewReleaseAlbums = (albums) => {
  // Sắp xếp mảng albums theo releaseDate từ mới nhất đến cũ nhất
  albums.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  
  // Trả về 6 album đầu tiên trong mảng đã sắp xếp
  return albums.length > 6 ? albums.slice(0, 6) : albums;
};

export const loadPreviewTopAlbums = (albums) => {
  const newAlbums = shuffleArray(albums);
  return newAlbums.length > 6 ? newAlbums.slice(0, 6) : newAlbums;
};
