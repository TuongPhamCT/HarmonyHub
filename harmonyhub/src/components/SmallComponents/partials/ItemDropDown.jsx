import './ItemDropDown.css';
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export const ItemDropDownMenu = ({ buttonRef, onClose, menuItems }) => {
  const [position, setPosition] = useState({ top: -1000, left: -1000 });
  const menuRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const menuElement = document.querySelector(".dropdown-menu").getBoundingClientRect();

      let baseTop = rect.bottom + window.scrollY;
      let baseLeft = rect.left + window.scrollX;

      // Nếu dropdown vượt quá màn hình, dịch sang trái
      if (baseLeft + menuElement.width > window.innerWidth) {
        baseLeft = baseLeft + rect.width - menuElement.width;
      }
      // Nếu dropdown vượt quá màn hình, dịch lên trên
      if (baseTop + menuElement.height > window.innerHeight) {
        baseTop = rect.top + window.scrollY - menuElement.height;
      }
      setPosition({
        top: baseTop,
        left: baseLeft,
      });
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

  const handleClick = (event, menuItemAction) => {
    if (event) {
        event.stopPropagation();
    }
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
              onClick={(event) => handleClick(event, item.onClick)}
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