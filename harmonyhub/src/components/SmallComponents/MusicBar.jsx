import React, { useRef, useState } from 'react';
import button_love_off from '../../assets/img/component_love_off.png';
import button_love_on from '../../assets/img/component_love_on.png';
import button_more from '../../assets/img/component_more_vertical.png';
import item_placeholder from '../../assets/img/placeholder_disc.png';
import { serverDomain, sUser } from '../../store';
import { useFavorite } from '../Contexts/FavoriteContext';
import { toggleMainContentScroll } from '../MainPage/services/contentAreaServices';
import { sBoxAlts } from './componentStore';
import './MusicBar.css';
import { AddToPlaylist } from './partials/AddToPlaylist';
import { CreatePlaylist } from './partials/CreatePlaylist';
import { ItemDropDownMenu } from './partials/ItemDropDown';

const ssPrivilege = sUser.slice((n) => n.privilege);

export default function MusicBar(props) {
    const { favorites, toggleFavorites } = useFavorite();
    const favorToggle = favorites[(props.data.id || 0)] || false;
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
        const addToPlaylist = {
            name: "Add to Playlist",
            onClick: () => {
                setShowAddToPlaylist(!showAddToPlaylist)
            }
        };

        const removeFromPlaylist = {
            name: "Remove from playlist",
            onClick: async () => {
                if (props.onRemove) {
                    props.onRemove();
                }
            }
        }

        const removeFromAlbum = {
            name: "Remove from album",
            onClick: async () => {
                if (props.onRemove) {
                    props.onRemove();
                }
            }
        }

        switch (props.boxAlt) {
            case sBoxAlts.value.musicBoxInUserPlaylist:
                return [
                    removeFromPlaylist,
                ];
            case sBoxAlts.value.musicBoxInUserAlbum:
                return [
                    removeFromAlbum,
                ];
            default:
                return [
                    addToPlaylist,
                ];
        };
    }

    return (
        <div id="musicbar-wrapper" onClick={props.onClick || (() => {})}>
            <p id="musicbar-header" style={{width: props.headerWidth || "fit-content"}}>{props.header || "#"}</p>
            <div id="musicbar-container">
                <div id="musicbar-music-wrapper">
                    <img src={props.image ? (serverDomain + encodeURI(props.image)) : item_placeholder} alt="" onError={handleError} id="musicbar-image"></img>
                    <div id="musicbar-title-wrapper">
                        <p id="musicbar-title">{props.title || "Music Title"}</p>
                        <p id="musicbar-subtitle">{props.subtitle || "Artists"}</p>
                    </div>
                </div>
                <div id="musicbar-release-date">
                    <p>{props.releaseDate || "MM dd, yyyy"}</p>
                </div>
                <div id="musicbar-album">
                    <p>{props.played || (props.album || "-")}</p>
                </div>
                <div id="musicbar-favorite">
                    {
                        ssPrivilege.value.includes(2) === true ?
                            <img id="musicbar-button-favor" src={favorToggle ? button_love_on : button_love_off }
                            className="highlight-button" alt="" onClick={(event) => toggleFavor(event)}></img>
                        :
                            null
                    }
                </div>
                <div id="musicbar-time">
                    <p>{props.time || "-:-"}</p>
                </div>
                <div id="musicbar-more">
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
