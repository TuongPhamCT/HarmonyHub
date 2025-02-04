import './ItemDropDown.css';
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export const ItemDropDownMenu = ({ buttonRef, onClose, menuItems }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const menuElement = document.querySelector(".dropdown-menu").getBoundingClientRect();

      console.log(menuElement.width);

      // Nếu dropdown vượt quá màn hình, dịch sang trái
      if (rect.left + window.scrollX + menuElement.width > window.innerWidth) {
        setPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX + rect.width - menuElement.width, // Giới hạn trong màn hình
        });
      } else {
        setPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
    }
  }, [buttonRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, buttonRef]);

  const handleClick = (menuItemAction) => {
    if (typeof menuItemAction === "function") {
      menuItemAction();
    }
    onClose();
  }

  return createPortal(
    <div className="dropdown-menu"
      ref={menuRef}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
      }}
    >
      <ul>
        {
          menuItems && menuItems.map((item, index) => (
            <li
              key={index} 
              onClick={() => handleClick(item.onClick)}
            >
              {item.name}
            </li>
          ))
        }
      </ul>
    </div>,
    document.body
  );
}