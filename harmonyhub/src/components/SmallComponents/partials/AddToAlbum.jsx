import './AddToPlaylist.css';
import button_close from '../../../assets/img/component_close_icon.png';
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toggleMainContentScroll } from '../../MainPage/services/contentAreaServices';
import { TransparentBackground } from '../../Utils/TransparentBackground/TransparentBackground';
import { AlbumService } from '../../../services/apiCall/album';

export const AddToAlbum = ({data, onClose}) => {
  const [albums, setAlbums] = useState([]);
  const [songAlbumId, setSongAlbumId] = useState(null);
  const thisRef = useRef(null);

  useEffect(() => {
    toggleMainContentScroll(false);
    
    const controller = new AbortController(); 
    const fetchData =  async () => {
        const albums = await AlbumService.getMyAlbums().albums || [];
        setSongAlbumId(data.album_id);
        setAlbums(
          albums.map((item) => ({
            id: item.id,
            name: item.name,
            isChecked: item.id === data.album_id,
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

  const handleAlbumCheckboxChange = async (albumId, value) => {
    // call api to add / remove song in album
    if (value) {

      if (songAlbumId) {
        await AlbumService.removeSongFromAlbum(songAlbumId, data.id);
      }
      setAlbums(
        (prev) => prev.map((item) => ({...item, isChecked: item.id === albumId}))
      );
      await AlbumService.addSongToAlbum(albumId, data.id);
      setSongAlbumId(albumId);

    } else {
      if (songAlbumId) {
        await AlbumService.removeSongFromAlbum(songAlbumId, data.id);
        setSongAlbumId(null);
        setAlbums(
          (prev) => prev.map((item) => ({...item, isChecked: false}))
        );
      }
    }

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