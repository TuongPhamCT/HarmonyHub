import React, { useEffect, useRef } from 'react';
import './Sidebar.css'; // Import the CSS file for styling
import '../ScrollBar.css'; // Import the CSS file for styling
import logo from '../../assets/img/logo.png';
import icon_home from '../../assets/img/sidebar_home.png';
import icon_discover from '../../assets/img/sidebar_discover.png';
import icon_albums from '../../assets/img/sidebar_albums.png';
import icon_genres from '../../assets/img/sidebar_genres.png';
import icon_artists from '../../assets/img/sidebar_artists.png';
import icon_library from '../../assets/img/sidebar_library.png';
import icon_most_played from '../../assets/img/sidebar_most_played.png';
import icon_your_favorites from '../../assets/img/sidebar_your_favorites.png';
import icon_your_playlist from '../../assets/img/sidebar_your_playlist.png';
// import icon_add_playlist from '../../assets/img/sidebar_add_playlist.png';
import icon_settings from '../../assets/img/sidebar_settings.png';
import icon_logout from '../../assets/img/sidebar_logout.png';
import sidebar_icon from '../../assets/img/sidebar_menu_icon.png';
import new_song from '../../assets/img/new_song.png';
import add_song from '../../assets/img/add_song.png';
import { useLocation, useNavigate } from 'react-router';
import { sMainController, sUser } from '../../store';
import { handleLogout } from '../../services/logoutService';

const sidebar_items = [
  { itemName: "Menu", class: "sidebar_header", access: 0 },
  { itemName: "Home", img: icon_home, class: "sidebar_home", imgClass: "icon_home", id: '/', access: 0 },
  { itemName: "Discover", img: icon_discover, imgClass: "icon_content", id: '/discover' , access: 0 },
  { itemName: "Genres", img: icon_genres, imgClass: "icon_content", id: '/genres' , access: 3 },
  { itemName: "Albums", img: icon_albums, imgClass: "icon_content", id: '/albums', access: 0 },
  { itemName: "Artists", img: icon_artists, imgClass: "icon_content", id: '/artist', access: 0 },
  // {itemName: "Library", class: "sidebar_header"},
  { itemName: "Library", img: icon_library, imgClass: "icon_content", id: '/library' , access: 2 },
  { itemName: "Most Played", img: icon_most_played, imgClass: "icon_content", id: '/mostplayed', access: 0 },
  { itemName: "Playlist and favorite", class: "sidebar_header", access: 2 },
  { itemName: "Your favorites", img: icon_your_favorites, imgClass: "icon_content", id: '/favorites', access: 2 },
  { itemName: "Your Playlist", img: icon_your_playlist, imgClass: "icon_content", id: '/yourplaylist', access: 2 },
  // { itemName: "Add playlist", img: icon_add_playlist, id: "sidebar_add_playlist", imgClass: "icon_content" },
  { itemName: "Admin", class: "sidebar_header", access: 3 },
  { itemName: "Approve", img: new_song, imgClass: "icon_content", id: '/approve', access: 3 },
  { itemName: "Add Song", img: add_song, imgClass: "icon_content", id: '/addsong', access: 2 },
  { itemName: "General", class: "sidebar_header", access: 2 },
  { itemName: "Settings", img: icon_settings, imgClass: "icon_content", id: '/settings', access: 2 },
  { itemName: "Logout", img: icon_logout, id: "sidebar_logout", imgClass: "icon_content", access: 1 },
]

const ssPrivilege = sUser.slice((n) => n.privilege);

const Sidebar = () => {
  const menuRef = useRef(null); // Reference to the <ul> element
  const nav = useNavigate();

  const location = useLocation();
  useEffect(() => {
    const items = menuRef.current.querySelectorAll('li');
    const path = "/" + location.pathname.split('/')[1];
    items.forEach((item) => {
      if (item.id === path) {
        if (item.classList.contains('active') === false) {
          item.classList.add('active');
        }
      } else {
        item.classList.remove('active')
      }
    }
    ); // Remove "active" class from all items
  }, [location]);

  const handleClick = (e) => {
    if (e.target.tagName !== 'LI' || e.target.classList.contains('sidebar_header')) {
      return;
    }

    switch (e.target.id) {
      case '/':
        nav('/');
        break;
      case '/discover':
        nav('/discover');
        break;
      case '/albums':
        nav('/albums');
        break;
      case '/genres':
        nav('/genres');
        break;
      case '/artist':
        nav('/artist');
        break;
      case '/yourplaylist':
        nav('/yourplaylist');
        break;
      case '/approve':
        nav('/approve');
        break;
      case '/addsong':
        nav('/addsong');
        break;
      case '/library':
        nav('/library');
        break;
      case '/favorites':
        nav('/favorites');
        break;
      case '/mostplayed':
        nav('/mostplayed');
        break;
      case "sidebar_add_playlist":
        return;
      case '/settings':
        nav('/albumdetails');
        break;
      case "sidebar_logout":
        handleLogout();
        nav('/');
        return;
      default:
        return;
    }
  };

  // Sidebar toggle button

  const handleSidebarIconClick = () => {
    sMainController.set((v) => v.value.showSidebar = !v.value.showSidebar);
  };

  return (
    <div className="sidebar">
      <div id="sidebar_logo_wrapper">
        <img id="icon_sidebar_toggle" src={sidebar_icon} loading="lazy" alt="" className="txt_button"
          onClick={handleSidebarIconClick}></img>
        <img id="sidebar_logo" src={logo} loading="lazy" alt="Logo" />
      </div>
      <ul ref={menuRef} onClick={handleClick}>
        {
          <ssPrivilege.Wrap>
            {
              (value) => sidebar_items.filter((sItem) => value.includes(sItem.access)).map(
                (item, index) => (
                  <li key={index} id={item.id ? item.id : undefined}
                    className={(item.class ? item.class + (item.isActive ? ' active' : '') : undefined)}>
                    {item.img ? <img src={item.img} className={item.imgClass} alt="" loading="lazy" /> : undefined} {item.itemName}
                  </li>
                )
              )
            }
          </ssPrivilege.Wrap>
        }
      </ul>
    </div>
  );
};

export default Sidebar;