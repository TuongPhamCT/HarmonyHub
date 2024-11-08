// import React from 'react'
import item_placeholder from '../../assets/img/placeholder_disc.png';
import './ItemBox.css';

export default function ItemBox(props) {
    const handleError = (e) => {
        e.target.onerror = null; // Prevents infinite loop if placeholder fails
        e.target.src = item_placeholder; // Placeholder image URL
    };

    return (
        // <div id="itembox-container">
        //     {props.titleHighlight === "Genres" &&
        //         <div>
        //             <img src={props.image || item_placeholder} style={{width: props.imageWidth, height: props.imageHeight}}
        //      alt="" onError={handleError} class="itembox-image"></img>
        //         </div>
        //     }
        //     {/* <img src={props.image || item_placeholder} style={{width: props.imageWidth, height: props.imageHeight}}
        //      alt="" onError={handleError} class="itembox-image"></img>
        //     <p id="itembox-title" style={{width: props.imageWidth}}>{props.title}</p>
        //     {
        //         props.subtitle || props.view ?
        //         <div id="itembox-subtitle-wrapper" style={{width: props.imageWidth}}>
        //             {props.subtitle ? <p id="itembox-subtitle">{props.subtitle}</p> : null}
        //             {props.view ? <p id="itembox-subtitle-right">{props.view}</p> : null}
        //         </div> : null
        //     } */}

        // </div>
    <div id="itembox-container">
        {props.titleHighlight === "Genres" && (
            <div>
                <div
                    style={{
                        position: "relative",
                        display: "inline-block"
                    }}
                >
                    <img
                        src={props.image || item_placeholder}
                        style={{
                            width: props.imageWidth,
                            height: props.imageHeight
                        }}
                        alt=""
                        onError={handleError}
                        className="itembox-image"
                    />
                    <div className="itembox-genres">
                        {props.title}
                    </div>
                </div>
            </div>
        )}
    
        {props.titleHighlight === "Playlist" && (
            <div>
                <div
                    style={{
                        position: "relative",
                        display: "inline-block",
                }}
                >
                    <img
                        src={props.image || item_placeholder}
                        style={{
                            width: props.imageWidth,
                            height: props.imageHeight
                        }}
                        alt=""
                        onError={handleError}
                        className="itembox-image"
                    />
                    <div className='itembox-moodplaylist-img'>
                        {props.title}
                    </div>
                </div>
                <span style={{color: "white"}}>{props.subtitle}</span>
            </div>
        )}

        {props.titleHighlight === "Artists" && (
            <div
                style={{
                    position: "relative",
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <img
                    src={props.image || item_placeholder}
                    style={{
                        width: props.imageWidth,
                        height: props.imageHeight
                    }}
                    alt=""
                    onError={handleError}
                    className="itembox-image-artist"
                />
                <span style={{color: "white", marginTop:"1.3vh"}}>{props.title}</span>
            </div>
        )}

        {props.titleHighlight === "Video" && (
            <div>
                <div
                    style={{
                        position: "relative",
                        display: "inline-block",
                }}
                >
                    <img
                        src={props.image || item_placeholder}
                        style={{
                            width: props.imageWidth,
                            height: props.imageHeight
                        }}
                        alt=""
                        onError={handleError}
                        className="itembox-image"
                    />
                </div>
                <span className='itembox-video-name'>{props.title}</span>
                <br/>
                <div className='infor-row'>
                    <span className='itembox-video-artist'>{props.subtitle}</span>
                    <span className='itembox-video-artist'>{props.view}</span>
                </div>
            </div>
        )}

        {(props.titleHighlight === "Songs"  || props.titleHighlight === "Albums" )&& (
            <div>
                <div
                    style={{
                        position: "relative",
                        display: "inline-block",
                }}
                >
                    <img
                        src={props.image || item_placeholder}
                        style={{
                            width: props.imageWidth,
                            height: props.imageHeight
                        }}
                        alt=""
                        onError={handleError}
                        className="itembox-image"
                    />
                </div>
                <span className='itembox-video-name'>{props.title}</span>
                <br/>
                <span className='itembox-video-artist'>{props.subtitle}</span>
            </div>
        )}
    </div>
    )
}
