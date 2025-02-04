import './CreatePlaylist.css';
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { TextButton } from '../TextButton';
import { TransparentBackground } from '../../Utils/TransparentBackground/TransparentBackground';

export const CreatePlaylist = ({onClose}) => {
  const thisRef = useRef(null);

  const handleAddPlaylist = () => {
    // Handle create new playlist
  }

  useEffect(() => {
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

  return createPortal(
    <div>
      <TransparentBackground/>
      <div className="create-playlist-container"
        ref={thisRef}
      >
        <p id={"create-playlist-title"}>New playlist</p>
        <input
          type="text"
          id="create-playlist-input"
          placeholder="Type a name..."
        ></input>

        <div id={"create-playlist-buttons"}>
          <TextButton
            color={"#FFFFFF"}
            backgroundColor={"transparent"}
            width={"40%"}
            height={"100%"}
            text={"Cancel"}
            onClick={onClose}
          />
          <TextButton
            color={"#FFFFFF"}
            backgroundColor={"transparent"}
            width={"40%"}
            height={"100%"}
            text={"Add"}
            onClick={handleAddPlaylist}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}