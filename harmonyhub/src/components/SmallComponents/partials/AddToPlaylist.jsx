import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import button_close from '../../../assets/img/component_close_icon.png';
import { PlaylistService } from '../../../services/apiCall/playlist';
import { toggleMainContentScroll } from '../../MainPage/services/contentAreaServices';
import { TransparentBackground } from '../../Utils/TransparentBackground/TransparentBackground';
import { TextButton } from '../TextButton';
import './AddToPlaylist.css';

export const AddToPlaylist = ({data, onCreatePlaylist, onClose}) => {
  const [playlists, setPlaylists] = useState([]);
  const thisRef = useRef(null);

  useEffect(() => {
    toggleMainContentScroll(false);
    
    const controller = new AbortController(); 
    const fetchData =  async () => {
      const playlists = await PlaylistService.getMyPlaylists() || [];
      const containers = await PlaylistService.getPlaylistsContainSong(data.id) || [];
      const containerIds = containers.map((item) => item.id);

      setPlaylists(
        playlists.map((item) => ({
          id: item.id,
          name: item.name,
          isChecked: containerIds.includes(item.id),
        }))
      );
    }

    const handleClickOutside = (event) => {
      if (
        thisRef.current &&
        !thisRef.current.contains(event.target) &&
        thisRef.current &&
        !thisRef.current.contains(event.target)
      ) {
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    fetchData();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      controller.abort(); // Cleanup function: hủy request khi component unmount
    };
  }, [data, onClose]);

  const handlePlaylistCheckboxChange = async (playlistId, value) => {
    // call api to add / remove song in playlist
    if (value) {
      await PlaylistService.addSongToPlaylist(playlistId, data.id);
    } else {
      await PlaylistService.removeSongFromPlaylist(playlistId, data.id);
    }
  }

  return createPortal(
    <div>
      <TransparentBackground/>
      <div className="add-to-playlist-container"
        ref={thisRef}
        onClick={(e) => e.stopPropagation()} 
      >
        <div id={"add-to-playlist-header"}>
          <p id={"add-to-playlist-title"}>Add to...</p>
          <img
              id="add-to-playlist-close-button"
              className="highlight-button"
              onClick={onClose}
              src={button_close}
              alt=""
          ></img>
        </div>
        <hr></hr>
          {
            playlists.length === 0 ?
              <p>No playlist here</p>
            :
              playlists.map((item, index) => 
                <div key={"atp-playlist-" + index} className="add-to-playlist-item">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={item.isChecked}
                    onChange={() => handlePlaylistCheckboxChange(item.id, !item.isChecked)}
                  />
                  <p>{item.name}</p>
                </div>
              )
          }
        <br></br>
        <TextButton
          color={"#FFFFFF"}
          backgroundColor={"transparent"}
          width={"90%"}
          height={"6vh"}
          text={"Create new playlist"}
          onClick={onCreatePlaylist}
        />
      </div>
    </div>,
    document.body
  );
}