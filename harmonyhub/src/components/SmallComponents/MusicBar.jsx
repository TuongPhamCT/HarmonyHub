import React, { useRef, useState } from 'react';
import item_placeholder from '../../assets/img/placeholder_disc.png';
import button_more from '../../assets/img/component_more_vertical.png';
import button_love_on from '../../assets/img/component_love_on.png';
import button_love_off from '../../assets/img/component_love_off.png';
import './MusicBar.css';
import { ItemDropDownMenu } from './partials/ItemDropDown';
import { toggleMainContentScroll } from '../MainPage/services/contentAreaServices';
import { AddToPlaylist } from './partials/AddToPlaylist';
import { CreatePlaylist } from './partials/CreatePlaylist';

export default function MusicBar(props) {
    const [favorToggle, setFavorToggle] = useState(props.favor || false);
    const [showMenu, setShowMenu] = useState(false);
    const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
    const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
    const buttonRef = useRef(null);
    
    const handleError = (e) => {
        e.target.onerror = null; // Prevents infinite loop if placeholder fails
        e.target.src = item_placeholder; // Placeholder image URL
    };

    // Toggle favorite
    const toggleFavor = () => {
        setFavorToggle(!favorToggle);
    }

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

    return (
        <div id="musicbar-wrapper">
            <p id="musicbar-header" style={{width: props.headerWidth || "fit-content"}}>{props.header || "#"}</p>
            <div id="musicbar-container">
                <div id="musicbar-music-wrapper">
                    <img src={props.image || item_placeholder} alt="" onError={handleError} id="musicbar-image"></img>
                    <div id="musicbar-title-wrapper">
                        <p id="musicbar-title">{props.title || "Music Title"}</p>
                        <p id="musicbar-subtitle">{props.subtitle || "Artists"}</p>
                    </div>
                </div>
                <div id="musicbar-release-date">
                    <p>{props.releaseDate || "MM dd, yyyy"}</p>
                </div>
                <div id="musicbar-album">
                    <p>{props.album || "-"}</p>
                </div>
                <div id="musicbar-favorite">
                    <img id="musicbar-button-favor" src={favorToggle ? button_love_on : button_love_off }
                     className="highlight-button" alt="" onClick={toggleFavor}></img>
                </div>
                <div id="musicbar-time">
                    <p>{props.time || "-:-"}</p>
                </div>
                <div id="musicbar-more">
                    <img id="musicbar-button-more" src={button_more} ref={buttonRef} className="highlight-button" alt="" onClick={handleOpenMore}></img>
                </div>
            </div>

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
