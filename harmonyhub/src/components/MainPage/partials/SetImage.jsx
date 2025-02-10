import './CreateGenre.css';
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TransparentBackground } from '../../Utils/TransparentBackground/TransparentBackground';
import { TextButton } from '../../SmallComponents/TextButton';
import { GenreService } from '../../../services/apiCall/genre';
import { serverDomain } from '../../../store';
import { UserService } from '../../../services/apiCall/user';

export const SetImage = ({data, onClose, onUpdate}) => {
  const thisRef = useRef(null);
  const [allowEdit, setAllowEdit] = useState(true);
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSetImage = async () => {
    // Handle set image

    await UserService.setUserImage(
      {
        image: imageFile,
      }
    );

    onUpdate(data);
  }

  useEffect(() => {
    setInputValue(data.name);
    setImage(serverDomain + data.image);

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
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return createPortal(
    <div>
      <TransparentBackground/>
      <div className="set-image-container"
        ref={thisRef}
        onClick={(event) => event.stopPropagation()}
      >
        <p id={"set-image-title"}>Edit Genre</p>

        <div
          id="set-image-image"
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

        <div id={"set-image-buttons"}>
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
            text={"Update"}
            disabled={!allowEdit}
            onClick={handleSetImage}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}