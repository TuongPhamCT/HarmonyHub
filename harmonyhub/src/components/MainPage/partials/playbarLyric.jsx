import './playbarLyric.css';
import { createPortal } from "react-dom";

export const PlaybarLyric = ({lyric}) => {

  return createPortal(
    <div className="playbar-lyric-container">
      <pre>{lyric}</pre>
    </div>,
    document.body
  );
}