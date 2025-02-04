import './AddToPlaylist.css';
import button_close from '../../../assets/img/component_close_icon.png';
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TextButton } from '../TextButton';
import { toggleMainContentScroll } from '../../MainPage/services/contentAreaServices';
import { TransparentBackground } from '../../Utils/TransparentBackground/TransparentBackground';

export const AddToPlaylist = ({onCreatePlaylist, onClose}) => {
  const [playlists, setPlaylists] = useState([]);
  const thisRef = useRef(null);

  useEffect(() => {
    toggleMainContentScroll(false);
    
    getUserPlaylists();

    const handleClickOutside = (event) => {
      if (
        thisRef.current &&
        !thisRef.current.contains(event.target) &&
        thisRef.current &&
        !thisRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const getUserPlaylists = () => {
    // get User Playlist here
    setPlaylists([
      {id: "1", name: "playlist 1", isCheck: false},
      {id: "2", name: "playlist 2", isCheck: false},
      {id: "3", name: "playlist 3", isCheck: false},
    ]);
  }

  const handlePlaylistCheckboxChange = (playlistId, value) => {
    // call api to add / remove song in playlist
  }

  return createPortal(
    <div>
      <TransparentBackground/>
      <div className="add-to-playlist-container"
        ref={thisRef}
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