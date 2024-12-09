// import React from 'react'
import item_placeholder from '../../assets/img/placeholder_disc.png';
import { sComponents } from './componentStore';
import './ItemBox.css';

export default function ItemBox(props) {
    const handleError = (e) => {
        e.target.onerror = null; // Prevents infinite loop if placeholder fails
        e.target.src = item_placeholder; // Placeholder image URL
    };

    return (
        <div id="itembox-container" onClick={props.onClick}>
            <div id="itembox-image-container"
                 style={{width: props.imageWidth, height: props.imageHeight}}
                 className={props.roundImage ? "round" : "square"}>
                <img src={props.image || item_placeholder}
                alt="" onError={handleError} id="itembox-image"></img>
                {props.imageTitle ? <p id="itembox-image-title">props.imageTitle</p> : null}
            </div>
            <p id="itembox-title" style={{width: props.imageWidth, textAlign: (props.titleAlign || 'left')}}>{props.title}</p>
            {
                props.subtitle || props.view ?
                <div id="itembox-subtitle-wrapper" style={{width: props.imageWidth}}>
                    {props.subtitle ? <p id="itembox-subtitle">{props.subtitle}</p> : null}
                    {props.view ? <p id="itembox-subtitle-right">{props.view}</p> : null}
                </div> : null
            }

        </div>
    )
}

export const ArtistBox = (props) => {
    return (
        <ItemBox
            imageWidth={sComponents.value.artistBoxWidth}
            imageHeight={sComponents.value.artistBoxHeight}
            title={props.title}
            titleAlign="center"
            roundImage={true}
            onClick={props.onClick}
        />
    );
}

export const MusicBox = (props) => {
    return (
        <ItemBox
            imageWidth={sComponents.value.musicBoxWidth}
            imageHeight={sComponents.value.mvBoxHeight}
            title={props.title}
            subtitle={props.subtitle}
            onClick={props.onClick}
        />
    );
}

export const AlbumBox = (props) => {
    return (
        <ItemBox
            imageWidth={sComponents.value.albumBoxWidth}
            imageHeight={sComponents.value.albumBoxHeight}
            title={props.title}
            subtitle={props.subtitle}
            onClick={props.onClick}
        />
    );
}

export const PlaylistBox = (props) => {
    return (
        <ItemBox
            imageWidth={sComponents.value.playlistBoxWidth}
            imageHeight={sComponents.value.playlistBoxHeight}
            title={props.title}
            onClick={props.onClick}
        />
    );   
}

export const MvBox = (props) => {
    return (
        <ItemBox
            imageWidth={sComponents.value.mvBoxWidth}
            imageHeight={sComponents.value.mvBoxHeight}
            title={props.title}
            subtitle={props.subtitle}
            view={props.view}
            onClick={props.onClick}
        />
    );
}

export const GenreBox = (props) => {
    return (
        <ItemBox
            imageWidth={sComponents.value.genreBoxWidth}
            imageHeight={sComponents.value.mvBoxHeight}
            imageTitle={props.title}
            onClick={props.onClick}
        />
    );
}