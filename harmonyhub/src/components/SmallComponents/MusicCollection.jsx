import './MusicCollection.css';
import '../Global.css';

export default function MusicCollection(props) {
    return (
        <div id="music-collection-wrapper">
            <p className="item-collection-title">{props.title} <span className="pink">{props.titleHighlight}</span></p>
            <div id="music-collection-labels-wrapper">
                {/* Gap */}
                <div style={{width: props.headerGap, marginRight: "2.5vh"}}></div>
                {/* Labels */}
                <div id="music-collection-labels">
                    <div style={{width: "30%"}}></div>
                    <p style={{width: "10%"}}>Release Date</p>
                    <p style={{width: "40%"}}>Album</p>
                    {/* Gap */}
                    <div style={{width: "7%"}}></div>
                    <p style={{width: "13%"}}>Time</p>
                </div>
            </div>
            <div id="music-collection-container">
                {props.musicList}
            </div>
            <p id="music-collection-view-all-button" className="txt_button">✚ View All</p>
        </div>
    )
}
