// import React from 'react';
import view_all from '../../assets/img/component_view_all.png';
import './ItemCollection.css';
import '../Global.css';

export default function ItemCollection(props) {
    const maxItems = props.maxItems || 5;

    return (
        <div id="item-collection-wrapper">
            <p className="item-collection-title">{props.title} <span className="pink">{props.titleHighlight}</span></p>
            <div id="item-collection-list-wrapper">
                <div id="item-collection-container">
                    {props.itemList
                        ? (props.itemList.length > maxItems
                            ? props.itemList.slice(0, maxItems)
                            : props.itemList
                        )
                        : null}
                </div>
                {
                    props.itemList && (props.itemList.length > maxItems ?
                        <div id="item-collection-view-all-wrapper">
                            <img id="item-collection-view-all-icon" alt="" src={view_all} onClick={props.onViewAll}></img>
                            <p id="item-collection-view-all-txt">View All</p>
                        </div>
                        :
                        null
                    ) 
                }
            </div>
        </div>
    )
}

export const MvCollection = (props) => {
    return (
        <div id="item-collection-wrapper">
            <p className="item-collection-title">{props.title} <span className="pink">{props.titleHighlight}</span></p>
            <div id="item-collection-list-wrapper">
                <div id="mv-collection-container">
                    {props.itemList || null}
                </div>
                <div id="item-collection-view-all-wrapper">
                    <img id="item-collection-view-all-icon" alt="" src={view_all} onClick={props.onViewAll}></img>
                    <p id="item-collection-view-all-txt">View All</p>
                </div>
            </div>
        </div>
    )
}
