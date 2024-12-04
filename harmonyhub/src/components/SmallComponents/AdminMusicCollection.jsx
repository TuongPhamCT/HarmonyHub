import './MusicCollection.css';
import '../Global.css';

export default function AdminMusicCollection(props) {
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
                    <p style={{width: "37%"}}>Album</p>  
                    <p style={{width: "11%"}}>Time</p>
                    <p style={{width: "10%"}}>Actions</p>
                </div>
            </div>
            <div id="music-collection-container">
                {props.musicList}
            </div>
        </div>
    )
}
