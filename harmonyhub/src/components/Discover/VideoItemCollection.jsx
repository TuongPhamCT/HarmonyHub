// import React from 'react';
import view_all from '../../assets/img/component_view_all.png';
import './VideoItemCollection.css';
import '../Global.css';

export default function VideoItemCollection(props) {
    
    return (
        <div id="vitem-collection-wrapper">
            <p class="vitem-collection-title">{props.title} <span class="pink">{props.titleHighlight}</span></p>
            <div id="vitem-collection-list-wrapper">
                <div id="vitem-collection-container">
                    {props.itemList || null}
                </div>
                <div id="vitem-collection-view-all-wrapper">
                    <img id="vitem-collection-view-all-icon" alt="" src={view_all}></img>
                    <p id="vitem-collection-view-all-txt">View All</p>
                </div>
            </div>
        </div>
    )
}
