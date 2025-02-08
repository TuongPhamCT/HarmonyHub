import './CreateGenre.css';
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TransparentBackground } from '../../Utils/TransparentBackground/TransparentBackground';
import { TextButton } from '../../SmallComponents/TextButton';

export const CreateGenre = ({onClose}) => {
  const thisRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [allowAdd, setAllowAdd] = useState(false);
  const [image, setImage] = useState("");
  const fileInputRef = useRef(null);

  const handleAddGenre = () => {
    // Handle create new Genre
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

  // Xử lý khi chọn ảnh
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return createPortal(
    <div>
      <TransparentBackground/>
      <div className="create-genre-container"
        ref={thisRef}
        onClick={(event) => event.stopPropagation()}
      >
        <p id={"create-genre-title"}>New Genre</p>
        <div
          id="create-genre-image"
          onClick={() => fileInputRef.current.click()}
          style={{
            backgroundImage: image ? `url(${image})` : "none",
          }}
        >
          {!image && <span>Upload Image</span>}
          {/* Input file ẩn */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        
        <input
          type="text"
          id="create-genre-input"
          placeholder="Type a name..."
          value={inputValue}
          onChange={(event) => handleInputValueChange(event.target.value)}
        ></input>

        <div id={"create-genre-buttons"}>
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
            onClick={handleAddGenre}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}