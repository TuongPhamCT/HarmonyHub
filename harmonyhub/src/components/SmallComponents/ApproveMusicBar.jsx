import React, { useState } from 'react';
import item_placeholder from '../../assets/img/placeholder_disc.png';
import button_more from '../../assets/img/component_more.png';
import './MusicBar.css';

export default function ApproveMusicBar(props) {
    const [favorToggle, setFavorToggle] = useState(props.favor || false);
    
    const handleError = (e) => {
        e.target.onerror = null; // Prevents infinite loop if placeholder fails
        e.target.src = item_placeholder; // Placeholder image URL
    };

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
                <div id="musicbar-time">
                    <p>{props.time || "-:-"}</p>
                </div>
                <div id="musicbar-actions">
                    <button id="musicbar-accept" onClick={() => console.log("Accepted!")}>Accept</button>
                    <button id="musicbar-deny" onClick={() => console.log("Denied!")}>Deny</button>
                </div>
                {props.hasMore ?
                    <div id="musicbar-more">
                        <img id="musicbar-button-more" src={button_more} className="highlight-button" alt=""></img>
                    </div>
                    : null}
            </div>
        </div>
    )
}
