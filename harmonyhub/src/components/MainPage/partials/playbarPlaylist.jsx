import { useState } from 'react';
import { MusicCollectionMini } from '../../SmallComponents/MusicCollection';
import './playbarPlaylist.css';
import { createPortal } from "react-dom";
import MusicBarMini from '../../SmallComponents/MusicBarMini';
import { createDemoSongs } from '../../../services/demoDataService';
import { handleOnClickSong } from '../../../services/itemOnClickService';

export const PlaybarPlaylist = () => {
  const [songs, setSongs] = useState([]);

  useState(() => {
    // call api to get songs by playlist id
    const dataSongs = createDemoSongs();

    setSongs(
        dataSongs.map(
            (item) => (
                <MusicBarMini
                    key={item.id}
                    title={item.name}
                    subtitle={item.artist}
                    data={item}
                    onClick={() => handleOnClickSong(item)}
                ></MusicBarMini>       
            )
        )
    );

  }, []);

  return createPortal(
    <div className="playbar-playlist-container">
      <MusicCollectionMini musicList={songs}/>
    </div>,
    document.body
  );
}