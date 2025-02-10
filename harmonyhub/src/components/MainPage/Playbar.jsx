import { useCallback, useEffect, useRef, useState } from 'react';
import './Playbar.css';
import { clearPlaybarDataFromLocal, convertIntToTime, handleNextButton, handlePreviousButton, handleToggleShuffle } from './services/playbarServices';

import item_placeholder from '../../assets/img/placeholder_disc.png';
import love_off from '../../assets/img/playbar/playbar-love-off.png';
import love_on from '../../assets/img/playbar/playbar-love-on.png';
import micro_active from '../../assets/img/playbar/playbar-microphone-active.png';
import micro from '../../assets/img/playbar/playbar-microphone.png';
import more from '../../assets/img/playbar/playbar-more.png';
import next from '../../assets/img/playbar/playbar-next.png';
import pause from '../../assets/img/playbar/playbar-pause.png';
import play from '../../assets/img/playbar/playbar-play.png';
import playlist_active from '../../assets/img/playbar/playbar-playlist-active.png';
import playlist from '../../assets/img/playbar/playbar-playlist.png';
import previous from '../../assets/img/playbar/playbar-previous.png';
import random_play_off from '../../assets/img/playbar/playbar-random-play-off.png';
import random_play_on from '../../assets/img/playbar/playbar-random-play-on.png';
import repeat_all from '../../assets/img/playbar/playbar-repeat-all.png';
import repeat_none from '../../assets/img/playbar/playbar-repeat-none.png';
import repeat_once from '../../assets/img/playbar/playbar-repeat-once.png';
import speaker_off from '../../assets/img/playbar/playbar-speaker-off.png';
import speaker_on from '../../assets/img/playbar/playbar-speaker-on.png';
import { SongService } from '../../services/apiCall/song';
import { serverDomain, sPlaybar, sUser } from '../../store';
import { useFavorite } from '../Contexts/FavoriteContext';
import { AddToPlaylist } from '../SmallComponents/partials/AddToPlaylist';
import { CreatePlaylist } from '../SmallComponents/partials/CreatePlaylist';
import { ItemDropDownMenu } from '../SmallComponents/partials/ItemDropDown';
import { PlaybarLyric } from './partials/playbarLyric';
import { PlaybarPlaylist } from './partials/playbarPlaylist';
import { toggleMainContentScroll } from './services/contentAreaServices';

const ssPrivilege = sUser.slice((n) => n.privilege);

export default function Playbar() {
  const { favorites, toggleFavorites } = useFavorite();
  const favorToggle = favorites[sPlaybar.value.playingSong ? sPlaybar.value.playingSong.id : -1] || false;
  const audioRef = useRef(null); // Tham chiếu đến thẻ audio
  const [progress, setProgress] = useState(0); // Giá trị tiến độ phát nhạc
  const [duration, setDuration] = useState(0); // Thời lượng tổng của bài hát
  const [audioSource, setAudioSource] = useState("");
  const [volume, setVolume] = useState(1); // Giá trị âm lượng (1 là max)
  const [speakerOn, setSpeakerOn] = useState(true);
  const [cacheVolume, setCacheVolume] = useState(1);
  const [randomToggle, setRandomToggle] = useState(false);
  const [playToggle, setPlayToggle] = useState(false);
  const [repeatToggle, setRepeatToggle] = useState("none");

  const [showLyric, setShowLyric] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const [image, setImage] = useState("");
  const [musicTitle, setMusicTitle] = useState("Music Title");
  const [artist, setArtist] = useState("Artist");
  const [lyric, setLyric] = useState("");

  // const [storedSeek, setStoredSeek] = useState();

  // Cập nhật tiến độ khi nhạc đang phát
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      localStorage.setItem("playbar-currentTime", audioRef.current.currentTime);
    }
  };

  // Cập nhật thời lượng bài hát khi nhạc được load
  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      
      if (playToggle) {
        audioRef.current.play().catch(error => {
          console.error("Playback failed", error);
          setPlayToggle(false);
        });;
      }

      // if (playToggle && !storedSeek) {
      //   audioRef.current.play();
      // } else if (storedSeek) {
      //   audioRef.current.currentTime = storedSeek;
      //   setStoredSeek(undefined);
      // }
    }
  }, [playToggle]);

  // Hàm load audio mới
  const handleLoadAudio = useCallback(async (song) => {
    const firstOpen = !audioSource || audioSource.length === 0;

    sPlaybar.set((v) => v.value.playingSong = song);

    setArtist(song.artist);
    setMusicTitle(song.name);
    setAudioSource(serverDomain + encodeURI(song.fileURL));
    setLyric(song.lyric);
    setImage(serverDomain + encodeURI(song.image));

    // handle Shuffle
    if (randomToggle) {
      if (!sPlaybar.value.played.some(obj => obj === sPlaybar.value.playingIndex)) {
        sPlaybar.set((v) => v.value.played = [...v.value.played, sPlaybar.value.playingIndex]);
      }
    }

    if (firstOpen) {
      setPlayToggle(true);
      await SongService.playSong(song.id);
    } 

    // if (firstOpen && !storedSeek) {
    //   setPlayToggle(true);
    //   setStoredSeek(undefined);
    //   await SongService.playSong(song.id);

    // } else if (storedSeek) {
    //   setPlayToggle(false);
    //   setStoredSeek(undefined);
    // }
    // console.log(response);

  }, [randomToggle, audioSource]);

  // hàm dọn dẹp playbar khi rỗng
  const handleClearPlaybar = useCallback(() => {
    setArtist("-");
    setMusicTitle("-");
    setAudioSource("");
    setLyric("");
    clearPlaybarDataFromLocal();
  }, []);

  const handleReplay = useCallback(() => {
    // replay
    audioRef.current.currentTime = 0; // Đưa thời gian bài hát về đầu
    audioRef.current.play(); // Phát lại bài hát
    setPlayToggle(true);
  }, []);

  const handleStop = useCallback(() => {
    audioRef.current.pause();
    setPlayToggle(false);
  }, []);

  // xử lý khi bài hát kết thúc
  const handleSongEnd = useCallback(() => {
    switch (repeatToggle) {
      case "all":
        {
          handleReplay();
          SongService.playSong(sPlaybar.value.playingSong.id);
          break;
        }

      case "once":
        {
          if (sPlaybar.value.repeat > 0) {
            sPlaybar.set((v) => v.value.repeat = v.value.repeat - 1);
            handleReplay();
            SongService.playSong(sPlaybar.value.playingSong.id);
          } else {
            sPlaybar.set((v) => v.value.repeat = 1);
            handleNextButton(randomToggle);
          }
          break;
        }

      case "none":
        {
          handleNextButton(randomToggle);
          break;
        }

      default:
        handleStop();
        break;
    }
  }, [randomToggle, repeatToggle, handleStop, handleReplay]);

  // Initialize

  const preLoading = useCallback(() => {
    // pre loading
    const savedVolume = localStorage.getItem("playbar-volume");
    const savedRepeat = localStorage.getItem("playbar-repeat");
    const savedRandom = localStorage.getItem("playbar-random");

    if (savedVolume) setVolume(savedVolume);
    if (savedRepeat) setRepeatToggle(savedRepeat);
    if (savedRandom) setRandomToggle(savedRandom);

  }, []);

  useEffect(() => {
    sPlaybar.set((v) => v.value.loadAudioFunction = handleLoadAudio);
    sPlaybar.set((v) => v.value.clearPlaybarFunction = handleClearPlaybar);
    sPlaybar.set((v) => v.value.stopPlaybarFunction = handleStop);
    sPlaybar.set((v) => v.value.replayPlaybarFunction = handleReplay);
    sPlaybar.set((v) => v.value.preLoadingPlaybarFunction = preLoading);

    const audioElement = audioRef.current;
    audioElement.addEventListener('ended', handleSongEnd);

    return () => {
      audioElement.removeEventListener('ended', handleSongEnd);
    };

  }, [handleLoadAudio, handleSongEnd, handleClearPlaybar, handleStop, handleReplay, preLoading]);

  // ========================================================

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setProgress(seekTime);
  };

  const handlePlayPause = () => {
    if (playToggle) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlayToggle(!playToggle);
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
      localStorage.setItem("playbar-volume", newVolume);
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
        sPlaybar.set((v) => v.value.repeat = 1);
        localStorage.setItem("playbar-repeat", "once");
        break;
      case "once":
        setRepeatToggle("all");
        localStorage.setItem("playbar-repeat", "all");
        break;
      case "all":
        setRepeatToggle("none");
        localStorage.setItem("playbar-repeat", "none");
        break;
      default:
        break;
    }
  }

  const handleFavorToggle = () => {
    toggleFavorites(sPlaybar.value.playingSong.id);
  }

  const handleSpeakerToggle = () => {
    if (speakerOn) {
      setCacheVolume(volume);
      setVolume(0);
      setSpeakerOn(false);
      localStorage("playbar-volume", 0);
    } else {
      setVolume(cacheVolume > 0 ? cacheVolume : 1);
      setSpeakerOn(true);
      localStorage("playbar-volume", 1);
    }
  }

  const handleTogglePlaylist = () => {
    setShowLyric(false);
    setShowPlaylist(!showPlaylist);
  }

  const handleToggleLyric = () => {
    setShowPlaylist(false);
    setShowLyric(!showLyric);
  }

  const RepeatImage = {
    "none": repeat_none,
    "once": repeat_once,
    "all" : repeat_all,
  }

  // ==================================================================
  // MORE BUTTON

  const [showMenu, setShowMenu] = useState(false);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const buttonRef = useRef(null);

  const handleOpenMore = () => {
    toggleMainContentScroll(showMenu);
    setShowMenu(!showMenu);
  }

  const handleCloseMore = () => {
      toggleMainContentScroll(true);
      setShowMenu(false);
  }

  const createMenuItems = () => {
    return [
        {
            name: "Add to Playlist",
            onClick: () => {
                setShowAddToPlaylist(!showAddToPlaylist)
            }
        },
    ];
  }

  // ==================================================================

  return (
    <div id="playbar-container">
      {/* Audio player */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        controls
        src={audioSource}
        type="audio/mpeg"
        hidden
      />
      <div id="playbar-left-container">
          <div id="playbar-music-wrapper">
              <img src={image} alt="" onError={handleImageError} id="playbar-image"></img>
              <div id="playbar-title-wrapper">
                  <p id="playbar-title">{musicTitle}</p>
                  <p id="playbar-subtitle">{artist}</p>
              </div>
          </div>
          {
            ssPrivilege.value.includes(2) === true ?
              <img
                src={favorToggle ? love_on : love_off }
                className="playbar-button playbar-button-small-size"
                alt=""
                onClick={() => handleFavorToggle()}
              ></img> : null
          }
          {
            ssPrivilege.value.includes(2) === true ? 
              <img
                ref={buttonRef}
                src={ more }
                className="playbar-button playbar-button-small-size"
                alt=""
                onClick={handleOpenMore}
              ></img> : null
          }
      </div>
      <div id="playbar-middle-container">
        <div id="playbar-buttons-container">
          <img
            src={ randomToggle ? random_play_on : random_play_off }
            className="playbar-button playbar-button-big-size"
            alt=""
            onClick={() => {
              localStorage.setItem("playbar-random", !randomToggle);
              setRandomToggle(!randomToggle);
              handleToggleShuffle();
            }}
          ></img>
          <img
            src={ previous }
            className="playbar-button playbar-button-big-size"
            alt=""
            onClick={() => handlePreviousButton()}
          ></img>
          <img
            src={ playToggle ? pause : play }
            id="playbar-play-button"
            className="playbar-button"
            alt=""
            onClick={() => handlePlayPause()}
          ></img>
          <img
            src={ next }
            className="playbar-button playbar-button-big-size"
            alt=""
            onClick={() => handleNextButton(randomToggle)}
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
          src={ showPlaylist ? playlist_active : playlist }
          className="playbar-button playbar-button-big-size"
          alt=""
          onClick={handleTogglePlaylist}
        ></img>
        <img
          src={ showLyric ? micro_active : micro }
          className="playbar-button playbar-button-big-size"
          alt=""
          onClick={handleToggleLyric}
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


      {
        showPlaylist && (
            <PlaybarPlaylist/>
        )
      }
      {
        showLyric && (
            <PlaybarLyric lyric={lyric}/>
        )
      }
      {
        showMenu && (
            <ItemDropDownMenu buttonRef={buttonRef} onClose={handleCloseMore} menuItems={createMenuItems()}/>
        )
      }
      {
        showAddToPlaylist && (
            <AddToPlaylist
                onCreatePlaylist={() => {
                    setShowCreatePlaylist(!showCreatePlaylist);
                    setShowAddToPlaylist(!showAddToPlaylist);
                    toggleMainContentScroll(false);
                }}
                onClose={() => {
                    setShowAddToPlaylist(!showAddToPlaylist);
                    toggleMainContentScroll(true);
                }}
                data={sPlaybar.value.playingSong}
            />
        )
      }
      {
        showCreatePlaylist && (
            <CreatePlaylist onClose={() => {
                setShowCreatePlaylist(!showCreatePlaylist);
                toggleMainContentScroll(true);
            }} />
        )
      }
    </div>
  )
}