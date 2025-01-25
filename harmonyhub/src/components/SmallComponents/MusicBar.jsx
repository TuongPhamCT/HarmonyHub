import React, { useState } from 'react';
import item_placeholder from '../../assets/img/placeholder_disc.png';
import button_more from '../../assets/img/component_more_vertical.png';
import button_love_on from '../../assets/img/component_love_on.png';
import button_love_off from '../../assets/img/component_love_off.png';
import './MusicBar.css';

export default function MusicBar(props) {
    const [favorToggle, setFavorToggle] = useState(props.favor || false);
    
    const handleError = (e) => {
        e.target.onerror = null; // Prevents infinite loop if placeholder fails
        e.target.src = item_placeholder; // Placeholder image URL
    };

    // Toggle favorite
    const toggleFavor = () => {
        setFavorToggle(!favorToggle);
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
                    <img id="musicbar-button-more" src={button_more} className="highlight-button" alt=""></img>
                </div>
            </div>
        </div>
    )
}
