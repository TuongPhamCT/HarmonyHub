import './CreateAlbum.css';
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TransparentBackground } from '../../Utils/TransparentBackground/TransparentBackground';
import { TextButton } from '../../SmallComponents/TextButton';

export const EditAlbum = ({data, onClose, onUpdate}) => {
  const thisRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [desInputValue, setDesInputValue] = useState("");
  const [allowEdit, setAllowEdit] = useState(true);
  const [image, setImage] = useState("");
  const fileInputRef = useRef(null);

  const handleEditAlbum = async () => {
    // Handle create new Genre

    data.title = inputValue;
    data.description = desInputValue;
    data.image = image;

    onUpdate(data);
    onClose();
  }

  useEffect(() => {
    setInputValue(data.title);
    setDesInputValue(data.description);
    setImage(data.image);

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
  }, [data, onClose]);

  const handleInputValueChange = (value) => {
    setAllowEdit(value.length > 0);
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
      <div className="create-album-container"
        ref={thisRef}
        onClick={(event) => event.stopPropagation()}
      >
        <p id={"create-album-title"}>Edit Album</p>

        <div
          id="create-album-image"
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
          name='albumName'
          type="text"
          className="create-album-input"
          placeholder="Type a name..."
          value={inputValue}
          onChange={(event) => handleInputValueChange(event.target.value)}
        ></input>

        <input
          name="albumDescription"
          type="text"
          className="create-album-input"
          placeholder="Type a description..."
          value={desInputValue}
          onChange={(event) => setDesInputValue(event.target.value)}
        ></input>

        <div id={"create-album-buttons"}>
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
            text={"Edit"}
            disabled={!allowEdit}
            onClick={handleEditAlbum}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}