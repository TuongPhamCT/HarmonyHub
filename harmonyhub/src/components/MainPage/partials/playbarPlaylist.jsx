import { useCallback, useEffect, useState } from 'react';
import { MusicCollectionMini } from '../../SmallComponents/MusicCollection';
import './playbarPlaylist.css';
import { createPortal } from "react-dom";
import MusicBarMini from '../../SmallComponents/MusicBarMini';
import { handleOnClickSong } from '../../../services/itemOnClickService';
import { sPlaybar } from '../../../store';

const ssPlayingIndex = sPlaybar.slice((v) => v.playingIndex);
const ssPlaylist = sPlaybar.slice((v) => v.playlist);

export const PlaybarPlaylist = () => {
  const [songs, setSongs] = useState([]);

  const handlePlaylistChange = useCallback(() => {
    const dataSongs = ssPlaylist.value;
    setSongs(
      dataSongs.map(
          (item, index) => (
              <MusicBarMini
                  key={item.id}
                  title={item.name}
                  subtitle={item.artist}
                  data={item}
                  image={item.image}
                  active={index === ssPlayingIndex.value }
                  onClick={() => handleOnClickSong(item)}
              ></MusicBarMini>       
          )
      )
    );
  }, []);

  useEffect(() => {
    handlePlaylistChange();
    sPlaybar.set((v) => v.value.updatePlaylistFunction = handlePlaylistChange);

    return () => {
      sPlaybar.set((v) => v.value.updatePlaylistFunction = null);
    };
  }, [handlePlaylistChange]);

  return createPortal(
    <div className="playbar-playlist-container">
      <MusicCollectionMini musicList={songs}/>
    </div>,
    document.body
  );
}