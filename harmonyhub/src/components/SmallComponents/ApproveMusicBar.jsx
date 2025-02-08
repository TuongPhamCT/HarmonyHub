// import React, { useState } from 'react';
import item_placeholder from '../../assets/img/placeholder_disc.png';
import { SongService } from '../../services/apiCall/song';
import { handleRemoveSong } from '../MainPage/services/playbarServices';
import './MusicBar.css';

export default function ApproveMusicBar(props) {
    
    const handleError = (e) => {
        e.target.onerror = null; // Prevents infinite loop if placeholder fails
        e.target.src = item_placeholder; // Placeholder image URL
    };

    const handleApprove = async (event) => {
        event.stopPropagation();
        SongService.approveSong(props.data.id);
        if (props.onRemove) {
            props.onRemove();
        }
    }

    const handleDeny = async (event) => {
        event.stopPropagation();
        handleRemoveSong(props.data);
        SongService.deleteSong(props.data.id);
        if (props.onRemove) {
            props.onRemove();
        }
    }

    return (
        <div id="musicbar-wrapper">
            <p id="musicbar-header" style={{width: props.headerWidth || "fit-content"}}>{props.header || "#"}</p>
            <div id="musicbar-container" onClick={props.onClick}>
                <div id="musicbar-music-wrapper-admin">
                    <img src={props.image || item_placeholder} alt="" onError={handleError} id="musicbar-image"></img>
                    <div id="musicbar-title-wrapper">
                        <p id="musicbar-title">{props.title || "Music Title"}</p>
                        <p id="musicbar-subtitle">{props.subtitle || "Artists"}</p>
                    </div>
                </div>
                <div id="musicbar-release-date-admin">
                    <p>{props.releaseDate || "MM dd, yyyy"}</p>
                </div>
                <div id="musicbar-album-admin">
                    <p>{props.played || (props.album || "-")}</p>
                </div>
                <div id="musicbar-time-admin">
                    <p>{props.time || "-:-"}</p>
                </div>
                <div id="musicbar-actions">
                    <button id="musicbar-accept" onClick={(event) => handleApprove(event)}>Accept</button>
                    <button id="musicbar-deny" onClick={(event) => handleDeny(event)}>Deny</button>
                </div>
            </div>
        </div>
    )
}
