// import React from 'react'
import item_placeholder from '../../assets/img/placeholder_disc.png';
import genre_placeholder from '../../assets/img/placeholder/placeholder_genre.png';
import album_placeholder from '../../assets/img/placeholder/placeholder_album.png';
import playlist_placeholder from '../../assets/img/placeholder/placeholder_playlist.png';
import artist_placeholder from '../../assets/img/placeholder/placeholder_artist.png';
import button_more from '../../assets/img/component_more_vertical.png';
import { sBoxAlts, sComponents } from './componentStore';
import './ItemBox.css';
import { useState, useRef } from 'react';
import { ItemDropDownMenu } from './partials/ItemDropDown';
import { toggleMainContentScroll } from '../MainPage/services/contentAreaServices';
import { CreatePlaylist } from './partials/CreatePlaylist';
import { AddToPlaylist } from './partials/AddToPlaylist';
import { sUser } from '../../store';
import { EditGenre } from '../AllGenresPage/partials/EditGenre';

const ssPrivilege = sUser.slice((n) => n.privilege);

export default function ItemBox(props) {
    const [showMenu, setShowMenu] = useState(false);
    const buttonRef = useRef(null);

    const handleError = (e) => {
        e.target.onerror = null; // Prevents infinite loop if placeholder fails
        e.target.src = item_placeholder; // Placeholder image URL
    };

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

    return (
        <div id="itembox-container" onClick={props.onClick}>
            <div id="itembox-image-container"
                style={{ width: props.imageWidth, height: props.imageHeight }}
                className={props.roundImage ? "round" : "square"}>
                <img src={props.image || (props.imagePlaceholder || item_placeholder)}
                    alt="" onError={handleError} id="itembox-image"></img>
                {props.imageTitle ? <p id="itembox-image-title">{props.imageTitle}</p> : null}
            </div>
            <div id="itembox-content-container">
                <div id="itembox-title-container">
                    <p id="itembox-title" style={{ width: "calc(" + props.imageWidth + " - 2vh)", textAlign: (props.titleAlign || 'left') }}>{props.title}</p>
                    {
                        props.subtitle || props.view ?
                            <div id="itembox-subtitle-wrapper" style={{ width: "calc(" + props.imageWidth + " - 2vh)" }}>
                                {props.subtitle ? <p id="itembox-subtitle">{props.subtitle}</p> : null}
                                {props.view ? <p id="itembox-subtitle-right">{props.view}</p> : null}
                            </div> : null
                    }
                </div>
                {
                    ssPrivilege.value.includes(1) === true && props.showMore ?
                        <img
                            id="itembox-more-button"
                            onClick={(event) => handleOpenMore(event)}
                            src={button_more}
                            ref={buttonRef}
                            className="highlight-button"
                            alt=""
                        ></img>
                    :
                        null
                }
            </div>

            {
                showMenu && (
                    <ItemDropDownMenu buttonRef={buttonRef} onClose={(event) => handleCloseMore(event)} menuItems={props.menuItems || null}/>
                )
            }
        </div>
    )
}

export const ArtistBox = (props) => {
    return (
        <ItemBox
            imageWidth={sComponents.value.artistBoxWidth}
            imageHeight={sComponents.value.artistBoxHeight}
            image={props.image}
            imagePlaceholder={artist_placeholder}
            title={props.title}
            titleAlign="center"
            roundImage={true}
            onClick={props.onClick}
        />
    );
}

export const MusicBox = (props) => {
    const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
    const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

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
        <div>
            <ItemBox
                imageWidth={sComponents.value.musicBoxWidth}
                imageHeight={sComponents.value.musicBoxHeight}
                image={props.image}
                title={props.title}
                subtitle={props.subtitle}
                onClick={props.onClick}
                showMore={true}
                menuItems={createMenuItems()}
            />
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
    );
}

export const AlbumBox = (props) => {
    return (
        <ItemBox
            imageWidth={sComponents.value.albumBoxWidth}
            imageHeight={sComponents.value.albumBoxHeight}
            image={props.image}
            imagePlaceholder={album_placeholder}
            title={props.title}
            subtitle={props.subtitle}
            onClick={props.onClick}
            showMore={false}
        />
    );
}

export const PlaylistBox = (props) => {

    const createMenuItems = () => {
        return [
            {
                name: "Clone playlist",
                onClick: () => {
                    console.log("Do something");
                }
            },
        ];
    }

    return (
        <ItemBox
            imageWidth={sComponents.value.playlistBoxWidth}
            imageHeight={sComponents.value.playlistBoxHeight}
            image={props.image}
            imagePlaceholder={playlist_placeholder}
            title={props.title}
            onClick={props.onClick}
            showMore={true}
            menuItems={createMenuItems()}
        />
    );
}

export const MvBox = (props) => {
    return (
        <ItemBox
            imageWidth={sComponents.value.mvBoxWidth}
            imageHeight={sComponents.value.mvBoxHeight}
            image={props.image}
            title={props.title}
            subtitle={props.subtitle}
            view={props.view}
            onClick={props.onClick}
            showMore={true}
        />
    );
}

export const GenreBox = (props) => {
    const [showEditGenre, setShowEditGenre] = useState(false);

    const createMenuItems = () => {
        return [
            {
                name: "Edit Genre",
                onClick: () => {
                    setShowEditGenre(true);
                    toggleMainContentScroll(false);
                }
            },
            {
                name: "Delete Genre",
                onClick: () => {
                    // do something
                }
            }
        ];
    }
    
    return (
        <div> 
            <ItemBox
                imageWidth={sComponents.value.genreBoxWidth}
                imageHeight={sComponents.value.genreBoxHeight}
                image={props.image}
                imagePlaceholder={genre_placeholder}
                imageTitle={props.title}
                onClick={props.onClick}
                showMore={ ssPrivilege.value.includes(3) && props.boxAlt === sBoxAlts.value.genreBoxEditable }
                menuItems={createMenuItems()}
            />

            {
                showEditGenre && (
                    <EditGenre onClose={() => {
                        setShowEditGenre(!showEditGenre);
                        toggleMainContentScroll(true);
                    }} data={props.data}/>
                )
            }
        </div>
    );
}