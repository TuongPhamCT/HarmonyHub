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
import { sUser } from '../../store';
import { useFavorite } from '../Contexts/FavoriteContext';

const ssPrivilege = sUser.slice((n) => n.privilege);

export default function MusicBarMini(props) {
    const { favorites, toggleFavorites } = useFavorite();
    const favorToggle = favorites[props.data.id] || false;
    const [showMenu, setShowMenu] = useState(false);
    const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
    const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
    const buttonRef = useRef(null);

    const handleError = (e) => {
        e.target.onerror = null; // Prevents infinite loop if placeholder fails
        e.target.src = item_placeholder; // Placeholder image URL
    };

    // Toggle favorite
    const toggleFavor = async (event) => {
        if (event) {
            event.stopPropagation();
        }
        toggleFavorites(props.data.id);
    }

    const handleOpenMore = (event) => {
        if (event) {
            event.stopPropagation();
        }
        toggleMainContentScroll(showMenu);
        setShowMenu(!showMenu);
    }

    const handleCloseMore = (event) => {
        if (event) {
            event.stopPropagation();
        }
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
        <div id="musicbar-wrapper" onClick={props.onClick || (() => {})}>
            <div id="musicbar-container" style={{background: props.active ? "#750a4e" : "transparent"}}>
                <div id="musicbar-music-wrapper-mini">
                    <img src={props.image || item_placeholder} alt="" onError={handleError} id="musicbar-image"></img>
                    <div id="musicbar-title-wrapper">
                        <p id="musicbar-title">{props.title || "Music Title"}</p>
                        <p id="musicbar-subtitle">{props.subtitle || "Artists"}</p>
                    </div>
                </div>
                <div id="musicbar-favorite-mini">
                    {
                        ssPrivilege.value.includes(2) === true ?
                            <img id="musicbar-button-favor" src={favorToggle ? button_love_on : button_love_off }
                            className="highlight-button" alt="" onClick={(event) => toggleFavor(event)}></img>
                        :
                            null
                    }
                </div>
                <div id="musicbar-more-mini">
                    {
                        ssPrivilege.value.includes(2) === true ?
                            <img
                                id="musicbar-button-more"
                                src={button_more}
                                ref={buttonRef}
                                className="highlight-button"
                                alt=""
                                onClick={(event) => handleOpenMore(event)}
                            ></img>
                        :
                            null
                    }
                </div>
            </div>

            {
                showMenu && (
                    <ItemDropDownMenu buttonRef={buttonRef} onClose={(event) => handleCloseMore(event)} menuItems={createMenuItems()}/>
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
                        data={props.data}
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
