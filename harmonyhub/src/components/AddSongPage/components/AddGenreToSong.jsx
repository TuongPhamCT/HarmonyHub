import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import button_close from '../../../assets/img/component_close_icon.png';
import { toggleMainContentScroll } from '../../MainPage/services/contentAreaServices';
import { TransparentBackground } from '../../Utils/TransparentBackground/TransparentBackground';
import './AddGenreToSong.css';

export const AddGenreToSong = ({selectedGenres, allGenres, onClose}) => {
  const [genres, setGenres] = useState([]);
  const thisRef = useRef(null);

  const handleClose = useCallback(() => {
    const genreIds = genres.filter((v) => v.isChecked).map((i) => i.id);
    onClose(allGenres.filter((v) => genreIds.includes(v.id)));
  }, [allGenres, genres, onClose]);

  useEffect(() => {
    toggleMainContentScroll(false);

    const selectedGenresId = selectedGenres.map((i) => i.id);

    setGenres(
      allGenres.map((item) => ({
        id: item.id,
        name: item.name,
        isChecked: selectedGenresId.includes(item.id),
      }))
    );

    const handleClickOutside = (event) => {
      if (
        thisRef.current &&
        !thisRef.current.contains(event.target) &&
        thisRef.current &&
        !thisRef.current.contains(event.target)
      ) {
        event.stopPropagation();
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [allGenres, selectedGenres, handleClose]);

  const handleGenresCheckboxChange = (index, value) => {
    setGenres((prevGenres) => {
      const updatedGenres = [...prevGenres];
      updatedGenres[index] = { ...updatedGenres[index], isChecked: value };
      return updatedGenres;
    });
  }

  return createPortal(
    <div>
      <TransparentBackground/>
      <div className="song-genre-container"
        ref={thisRef}
        onClick={(e) => e.stopPropagation()} 
      >
        <div id={"song-genre-header"}>
          <p id={"song-genre-title"}>Genres</p>
          <img
              id="song-genre-close-button"
              className="highlight-button"
              onClick={() => handleClose()}
              src={button_close}
              alt=""
          ></img>
        </div>
        <hr></hr>
          {
            genres.length === 0 ?
              <p>No Genre here</p>
            :
              genres.map((item, index) => 
                <div key={"atp-playlist-" + index} className="song-genre-item">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={item.isChecked}
                    onChange={() => handleGenresCheckboxChange(index, !item.isChecked)}
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