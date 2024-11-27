// import React from 'react'
import item_placeholder from '../../assets/img/placeholder_disc.png';
import './ItemBox.css';

export default function ItemBox(props) {
    const handleError = (e) => {
        e.target.onerror = null; // Prevents infinite loop if placeholder fails
        e.target.src = item_placeholder; // Placeholder image URL
    };

    return (
        <div id="itembox-container">
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
            imageWidth="24vh"
            imageHeight="24vh"
            title={props.title}
            titleAlign="center"
            roundImage={true}
        />
    );
}

export const MusicBox = (props) => {
    return (
        <ItemBox
            imageWidth="24vh"
            imageHeight="24vh"
            title={props.title}
            subtitle={props.subtitle}
        />
    );
}

export const AlbumBox = (props) => {
    return (
        <ItemBox
            imageWidth="24vh"
            imageHeight="24vh"
            title={props.title}
            subtitle={props.subtitle}
        />
    );
}

export const PlaylistBox = (props) => {
    return (
        <ItemBox
            imageWidth="24vh"
            imageHeight="24vh"
            title={props.title}
        />
    );   
}

export const MvBox = (props) => {
    return (
        <ItemBox
            imageWidth="42vh"
            imageHeight="24vh"
            title={props.title}
            subtitle={props.subtitle}
            view={props.view}
        />
    );
}

export const GenreBox = (props) => {
    return (
        <ItemBox
            imageWidth="31vh"
            imageHeight="23vh"
            imageTitle={props.title}
        />
    );
}