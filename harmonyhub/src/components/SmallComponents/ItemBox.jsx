// import React from 'react'
import { useRef, useState } from 'react';
import button_more from '../../assets/img/component_more_vertical.png';
import album_placeholder from '../../assets/img/placeholder/placeholder_album.png';
import artist_placeholder from '../../assets/img/placeholder/placeholder_artist.png';
import genre_placeholder from '../../assets/img/placeholder/placeholder_genre.png';
import playlist_placeholder from '../../assets/img/placeholder/placeholder_playlist.png';
import item_placeholder from '../../assets/img/placeholder_disc.png';
import { sUser } from '../../store';
import { EditGenre } from '../AllGenresPage/partials/EditGenre';
import { EditAlbum } from '../LibraryPage/partials/EditAlbum';
import { toggleMainContentScroll } from '../MainPage/services/contentAreaServices';
import { sBoxAlts, sComponents } from './componentStore';
import './ItemBox.css';
import { AddToAlbum } from './partials/AddToAlbum';
import { AddToPlaylist } from './partials/AddToPlaylist';
import { CreatePlaylist } from './partials/CreatePlaylist';
import { ItemDropDownMenu } from './partials/ItemDropDown';
import { PlaylistService } from '../../services/apiCall/playlist';
import { useFavorite } from '../Contexts/FavoriteContext';
import { handleRemoveSong } from '../MainPage/services/playbarServices';
import { EditPlaylist } from './partials/EditPlaylist';

const ssPrivilege = sUser.slice((n) => n.privilege);

export default function ItemBox(props) {
    const [showMenu, setShowMenu] = useState(false);
    const buttonRef = useRef(null);

    const handleError = (e) => {
        console.log("http://localhost:5000" + encodeURI(props.image));
        e.target.onerror = null; // Prevents infinite loop if placeholder fails
        e.target.src = props.imagePlaceholder || item_placeholder; // Placeholder image URL
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
                <img src={props.image ? "http://localhost:5000" + encodeURI(props.image) : (props.imagePlaceholder || item_placeholder)}
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
    const [showAddToAlbum, setShowAddToAlbum] = useState(false);
    const { toggleFavorites } = useFavorite();

    const createMenuItems = () => {
        const addToPlaylist = {
            name: "Add to Playlist",
            onClick: () => {
                setShowAddToPlaylist(!showAddToPlaylist)
            }
        };

        const addToAlbum = {
            name: "Add to Album",
            onClick: () => {
                setShowAddToAlbum(!showAddToAlbum)
            } 
        };

        const removeFromFavorite = {
            name: "Remove from favorites",
            onClick: () => {
                toggleFavorites(props.data.id);
                if (props.onRemove) {
                    props.onRemove();
                }
            } 
        };

        const deleteSong = {
            name: "Delete",
            onClick: () => {
                handleRemoveSong(props.data);
                if (props.onRemove) {
                    props.onRemove();
                }
            } 
        };

        switch (props.boxAlt) {
            case sBoxAlts.value.musicBoxInLibrary:
                return [
                    addToPlaylist,
                    addToAlbum,
                    deleteSong,
                ];
            case sBoxAlts.value.musicBoxInFavorites:
                return [
                    addToPlaylist,
                    removeFromFavorite,
                ];
            default:
                return [
                    addToPlaylist,
                ];
        }
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
                showMore={ssPrivilege.value.includes(3) === false}
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
                        data={props.data}
                    />
                )
            }
            {
                showAddToAlbum && (
                    <AddToAlbum
                        onClose={() => {
                            setShowAddToAlbum(!showAddToAlbum);
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
    );
}

export const AlbumBox = (props) => {
    const [showEditAlbum, setShowEditAlbum] = useState(false);

    const createMenuItems = () => {
        return [
            {
                name: "Edit Album",
                onClick: () => {
                    setShowEditAlbum(true);
                    toggleMainContentScroll(false);
                }
            },
            {
                name: "Delete Album",
                onClick: () => {
                    if (props.onRemove) {
                        props.onRemove();
                    }
                }
            }
        ];
    }

    return (
        <div>
            <ItemBox
                imageWidth={sComponents.value.albumBoxWidth}
                imageHeight={sComponents.value.albumBoxHeight}
                image={props.image}
                imagePlaceholder={album_placeholder}
                title={props.title}
                subtitle={props.subtitle}
                onClick={props.onClick}
                showMore={props.boxAlt && props.boxAlt === sBoxAlts.value.albumBoxInLibrary}
                menuItems={createMenuItems()}
            />
        
            {
                showEditAlbum && (
                    <EditAlbum onClose={() => {
                        setShowEditAlbum(!showEditAlbum);
                        toggleMainContentScroll(true);
                    }}
                    data={props.data}
                    onUpdate={props.onUpdate || (() => {})}
                    />
                )
            }
        </div>
    );
}

export const PlaylistBox = (props) => {

    const [showEditPlaylist, setShowEditPlaylist] = useState(false);

    const createMenuItems = () => {

        const clonePlaylist = {
            name: "Clone playlist",
            onClick: async () => {
                const playlistSongs = await PlaylistService.getPlaylistSongs(props.data.id) || [];
                const newPlaylist = await PlaylistService.createPlaylist({
                    title: props.data.title,
                    isPublic: props.data.isPublic
                });

                if (newPlaylist) {
                    await playlistSongs.forEach(async element => {
                        await PlaylistService.addSongToPlaylist(newPlaylist.id, element.id);
                    });
                }
            }
        };

        const editPlaylist = {
            name: "Edit Playlist",
            onClick: () => {
                setShowEditPlaylist(true);
                toggleMainContentScroll(false);
            }
        }

        const deletePlaylist = {
            name: "Delete Playlist",
            onClick: async () => {
                PlaylistService.deletePlaylist(props.data.id);
                if (props.onRemove) {
                    props.onRemove();
                }
            }
        }

        switch (props.boxAlt) {
            case sBoxAlts.value.playlistBoxOfUser:
                return [
                    editPlaylist,
                    deletePlaylist,
                ];
            default:
                return [
                    clonePlaylist,
                ];
        };
    }

    return (
        <div>
            <ItemBox
                imageWidth={sComponents.value.playlistBoxWidth}
                imageHeight={sComponents.value.playlistBoxHeight}
                image={props.image}
                imagePlaceholder={playlist_placeholder}
                title={props.title}
                onClick={props.onClick}
                showMore={ssPrivilege.value.includes(3) === false}
                menuItems={createMenuItems()}
            />
            {
                showEditPlaylist && (
                    <EditPlaylist onClose={() => {
                        setShowEditPlaylist(!showEditPlaylist);
                        toggleMainContentScroll(true);
                    }}
                    data={props.data}
                    onUpdate={props.onUpdate || (() => {})}
                    />
                )
            }
        </div>
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
                    if (props.onRemove) {
                        props.onRemove();
                    }
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
                    <EditGenre
                        onClose={() => {
                            setShowEditGenre(!showEditGenre);
                            toggleMainContentScroll(true);
                        }}
                        data={props.data}
                        onUpdate={props.onUpdate || (() => {})}
                    />
                )
            }
        </div>
    );
}