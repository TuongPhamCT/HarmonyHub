import './CreatePlaylist.css';
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TextButton } from '../TextButton';
import { TransparentBackground } from '../../Utils/TransparentBackground/TransparentBackground';

export const CreatePlaylist = ({onClose}) => {
  const thisRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [allowAdd, setAllowAdd] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

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
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleInputValueChange = (value) => {
    setAllowAdd(value.length > 0);
    setInputValue(value);
  }

  return createPortal(
    <div>
      <TransparentBackground/>
      <div className="create-playlist-container"
        ref={thisRef}
        onClick={(event) => event.stopPropagation()}
      >
        <p id={"create-playlist-title"}>New playlist</p>
        <input
          type="text"
          id="create-playlist-input"
          placeholder="Type a name..."
          value={inputValue}
          onChange={(event) => handleInputValueChange(event.target.value)}
        ></input>

        <div className="create-playlist-toggle">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
          <p>Public</p>
        </div>

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
            disabled={!allowAdd}
            onClick={handleAddPlaylist}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}