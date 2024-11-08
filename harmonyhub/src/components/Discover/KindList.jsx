// import React from 'react';
import view_all from '../../assets/img/component_view_all.png';
import '../Global.css';

export default function KindList(props) {
    
    return (
        <div id="item-collection-wrapper">
            <p class="item-collection-title">{props.title} <span class="pink">{props.titleHighlight}</span></p>
            <div id="item-collection-list-wrapper">
                <div id="item-collection-container">
                    {props.itemList || null}
                </div>
                <div id="item-collection-view-all-wrapper">
                    <img id="item-collection-view-all-icon" alt="" src={view_all}></img>
                    <p id="item-collection-view-all-txt">View All</p>
                </div>
            </div>
        </div>
    )
}