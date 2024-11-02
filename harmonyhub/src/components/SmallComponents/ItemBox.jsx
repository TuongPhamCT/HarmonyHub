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
            <img src={props.image || item_placeholder} style={{width: props.imageWidth, height: props.imageHeight}}
             alt="" onError={handleError} class="itembox-image"></img>
            <p id="itembox-title" style={{width: props.imageWidth}}>{props.title}</p>
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
