import './AddToPlaylist.css';
import button_close from '../../../assets/img/component_close_icon.png';
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toggleMainContentScroll } from '../../MainPage/services/contentAreaServices';
import { TransparentBackground } from '../../Utils/TransparentBackground/TransparentBackground';

export const AddToAlbum = ({onClose}) => {
  const [albums, setAlbums] = useState([]);
  const thisRef = useRef(null);

  useEffect(() => {
    toggleMainContentScroll(false);
    
    getUserAlbums();

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const getUserAlbums = () => {
    // get User Playlist here
    setAlbums([
      {id: "1", name: "album 1", isCheck: false},
      {id: "2", name: "album 2", isCheck: false},
      {id: "3", name: "album 3", isCheck: false},
    ]);
  }

  const handleAlbumCheckboxChange = (albumId, value) => {
    // call api to add / remove song in playlist
  }

  return createPortal(
    <div>
      <TransparentBackground/>
      <div className="add-to-playlist-container"
        ref={thisRef}
        onClick={(event) => event.stopPropagation()}
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
            albums.length === 0 ?
              <p>No playlist here</p>
            :
              albums.map((item, index) => 
                <div key={"atp-playlist-" + index} className="add-to-playlist-item">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={item.isChecked}
                    onChange={() => handleAlbumCheckboxChange(item.id, !item.isChecked)}
                  />
                  <p>{item.name}</p>
                </div>
              )
          }
      </div>
    </div>,
    document.body
  );
}