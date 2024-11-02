import React, { useRef } from 'react';
import './Sidebar.css'; // Import the CSS file for styling
import '../ScrollBar.css'; // Import the CSS file for styling
import logo from '../../assets/img/logo.png';
import icon_home from '../../assets/img/sidebar_home.png';
import icon_discover from '../../assets/img/sidebar_discover.png';
import icon_albums from '../../assets/img/sidebar_albums.png';
import icon_artists from '../../assets/img/sidebar_artists.png';
import icon_recently_added from '../../assets/img/sidebar_recently_added.png';
import icon_most_played from '../../assets/img/sidebar_most_played.png';
import icon_your_favorites from '../../assets/img/sidebar_your_favorites.png';
import icon_your_playlist from '../../assets/img/sidebar_your_playlist.png';
import icon_add_playlist from '../../assets/img/sidebar_add_playlist.png';
import icon_settings from '../../assets/img/sidebar_settings.png';
import icon_logout from '../../assets/img/sidebar_logout.png';
import sidebar_icon from '../../assets/img/sidebar_menu_icon.png';

const sidebar_items = [
  {itemName: "Menu", class: "sidebar_header"},
  {itemName: "Home", img: icon_home, class: "sidebar_home", imgClass: "icon_home", isActive: true},
  {itemName: "Discover", img: icon_discover, imgClass: "icon_content"},
  {itemName: "Albums", img: icon_albums, imgClass: "icon_content"},
  {itemName: "Artists", img: icon_artists, imgClass: "icon_content"},
  {itemName: "Library", class: "sidebar_header"},
  {itemName: "Recently Added", img: icon_recently_added, imgClass: "icon_content"},
  {itemName: "Most Played", img: icon_most_played, imgClass: "icon_content"},
  {itemName: "Playlist and favorite", class: "sidebar_header"},
  {itemName: "Your favorites", img: icon_your_favorites, imgClass: "icon_content"},
  {itemName: "Your Playlist", img: icon_your_playlist, imgClass: "icon_content"},
  {itemName: "Add playlist", img: icon_add_playlist, id:"sidebar_add_playlist", imgClass: "icon_content"},
  {itemName: "General", class: "sidebar_header"},
  {itemName: "Settings", img: icon_settings, imgClass: "icon_content"},
  {itemName: "Logout", img: icon_logout, id:"sidebar_logout", imgClass: "icon_content"},
]

const Sidebar = ({sidebarToggle, updateParent}) => {
    const menuRef = useRef(null); // Reference to the <ul> element

    const handleClick = (e) => {
      if (e.target.tagName !== 'LI' || e.target.classList.contains('sidebar_header')){
        return;
      }
      switch (e.target.id){
        case "sidebar_add_playlist":
          return;
        case "sidebar_logout":
          return;
        default:
          break;
      }
      const items = menuRef.current.querySelectorAll('li');
      items.forEach((item) => item.classList.remove('active')); // Remove "active" class from all items
      e.target.classList.add('active'); // Add "active" class to the clicked item
    };

    // Sidebar toggle button

    const handleSidebarIconClick = () => {
      // Call the function passed from the parent to update its state
      updateParent(!sidebarToggle);
  };

    return (
      <div className="sidebar">
        <div id="sidebar_logo_wrapper">
          <img id="icon_sidebar_toggle" src={sidebar_icon} loading="lazy" alt="" class="txt_button"
            onClick={handleSidebarIconClick}></img>
          <img id="sidebar_logo" src={logo} loading="lazy" alt="Logo"/>
        </div>
        <ul ref={menuRef} onClick={handleClick}>
          {
            sidebar_items.map(
              (item, index) => (
                <li key={index} id={item.id ? item.id : undefined}
                class={(item.class ? item.class + (item.isActive ? ' active' : '') : undefined)}>
                  {item.img ? <img src={item.img} class={item.imgClass} alt="" loading="lazy"/> : undefined} {item.itemName}
                </li>
              )
             )
          }
        </ul>
      </div>
    );
  };
  
  export default Sidebar;