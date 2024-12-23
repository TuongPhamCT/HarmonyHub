import { useRef, useState } from 'react';
import './Playbar.css';
import { convertIntToTime } from './services/playbarServices';

import item_placeholder from '../../assets/img/placeholder_disc.png';
import love_off from '../../assets/img/playbar/playbar-love-off.png';
import love_on from '../../assets/img/playbar/playbar-love-on.png';
import micro from '../../assets/img/playbar/playbar-microphone.png';
import more from '../../assets/img/playbar/playbar-more.png';
import next from '../../assets/img/playbar/playbar-next.png';
import previous from '../../assets/img/playbar/playbar-previous.png';
import random_play_off from '../../assets/img/playbar/playbar-random-play-off.png';
import random_play_on from '../../assets/img/playbar/playbar-random-play-on.png';
import repeat_none from '../../assets/img/playbar/playbar-repeat-none.png';
import repeat_once from '../../assets/img/playbar/playbar-repeat-once.png';
import repeat_all from '../../assets/img/playbar/playbar-repeat-all.png';
import speaker_off from '../../assets/img/playbar/playbar-speaker-off.png';
import speaker_on from '../../assets/img/playbar/playbar-speaker-on.png';
import play from '../../assets/img/playbar/playbar-play.png';
import pause from '../../assets/img/playbar/playbar-pause.png';

export default function Playbar() {
  const audioRef = useRef(null); // Tham chiếu đến thẻ audio
  const [progress, setProgress] = useState(0); // Giá trị tiến độ phát nhạc
  const [duration, setDuration] = useState(0); // Thời lượng tổng của bài hát
  const [volume, setVolume] = useState(1); // Giá trị âm lượng (1 là max)
  const [speakerOn, setSpeakerOn] = useState(true);
  const [cacheVolume, setCacheVolume] = useState(1);
  const [favorToggle, setFavorToggle] = useState(false);
  const [randomToggle, setRandomToggle] = useState(false);
  const [playToggle, setPlayToggle] = useState(false);
  const [repeatToggle, setRepeatToggle] = useState("none");

  // // Cập nhật tiến độ khi nhạc đang phát
  // const handleTimeUpdate = () => {
  //   if (audioRef.current) {
  //     setProgress(audioRef.current.currentTime);
  //   }
  // };

  // // Cập nhật thời lượng bài hát khi nhạc được load
  // const handleLoadedMetadata = () => {
  //   if (audioRef.current) {
  //     setDuration(audioRef.current.duration);
  //   }
  // };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setProgress(seekTime);
  };

  const handleImageError = (e) => {
      e.target.onerror = null; // Prevents infinite loop if placeholder fails
      e.target.src = item_placeholder; // Placeholder image URL
  };

  // Hàm xử lý khi slider thay đổi
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume; // Set volume cho audio
    }

    if (newVolume < 0.01 && speakerOn === true) {
      setSpeakerOn(false);
      setCacheVolume(1);
    } else if (newVolume >= 0.01 && speakerOn === false) {
      setSpeakerOn(true);
    }
  };

  const handleRepeatToggle = () => {
    switch (repeatToggle) {
      case "none":
        setRepeatToggle("once");
        break;
      case "once":
        setRepeatToggle("all");
        break;
      case "all":
        setRepeatToggle("none");
        break;
    }
  }

  const handleSpeakerToggle = () => {
    if (speakerOn) {
      setCacheVolume(volume);
      setVolume(0);
      setSpeakerOn(false);
    } else {
      setVolume(cacheVolume > 0 ? cacheVolume : 1);
      setSpeakerOn(true);
    }
  }

  const RepeatImage = {
    "none": repeat_none,
    "once": repeat_once,
    "all" : repeat_all,
  }

  return (
    <div id="playbar-container">
      {/* Audio player */}
      {/* <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        src="your-audio-file.mp3"
        controls
      ></audio> */}
      <div id="playbar-left-container">
          <div id="playbar-music-wrapper">
              <img src={item_placeholder} alt="" onError={handleImageError} id="playbar-image"></img>
              <div id="playbar-title-wrapper">
                  <p id="playbar-title">{"Music Title"}</p>
                  <p id="playbar-subtitle">{"Artists"}</p>
              </div>
          </div>
          <img
            src={favorToggle ? love_on : love_off }
            className="playbar-button playbar-button-small-size"
            alt=""
            onClick={() => setFavorToggle(!favorToggle)}
          ></img>
          <img
            src={ more }
            className="playbar-button playbar-button-small-size"
            alt=""
          ></img>
      </div>
      <div id="playbar-middle-container">
        <div id="playbar-buttons-container">
          <img
            src={ randomToggle ? random_play_on : random_play_off }
            className="playbar-button playbar-button-big-size"
            alt=""
            onClick={() => setRandomToggle(!randomToggle)}
          ></img>
          <img
            src={ previous }
            className="playbar-button playbar-button-big-size"
            alt=""
          ></img>
          <img
            src={ playToggle ? play : pause }
            id="playbar-play-button"
            className="playbar-button"
            alt=""
            onClick={() => setPlayToggle(!playToggle)}
          ></img>
          <img
            src={ next }
            className="playbar-button playbar-button-big-size"
            alt=""
          ></img>
          <img
            src={ RepeatImage[repeatToggle] }
            className="playbar-button playbar-button-big-size"
            alt=""
            onClick={handleRepeatToggle}
          ></img>
        </div>
        <div id="playbar-slider-container">
          <p>{ convertIntToTime(progress) }</p>
          <input
            type="range"
            min="0"
            max={duration}
            value={progress}
            onChange={handleSeek}
            style={{ width: '80%' }}
          />
          <p>{ convertIntToTime(duration) }</p>
        </div>
      </div>
      <div id="playbar-right-container">
        <img
          src={ micro }
          className="playbar-button playbar-button-big-size"
          alt=""
        ></img>
        <img
          src={ speakerOn ? speaker_on : speaker_off }
          className="playbar-button playbar-button-big-size"
          alt=""
          onClick={handleSpeakerToggle}
        ></img>
        <input
          id="volume-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          style={{ width: "15vh" }}
        />
      </div>
    </div>
  )
}