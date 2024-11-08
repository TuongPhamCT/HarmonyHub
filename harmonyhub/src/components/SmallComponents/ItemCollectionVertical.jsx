import './ItemCollectionVertical.css';
import '../Global.css';

export default function ItemCollectionVertical(props) {

    return (
        <div id="item-collectionv-wrapper">
            <p class="item-collectionv-title">{props.title} <span class="pink">{props.titleHighlight}</span></p>
            <div id="item-collectionv-list-wrapper">
                <div id="item-collectionv-container"
                 style={{gridTemplateColumns: "repeat(auto-fill, minmax(" + (props.columnWidth || "24vh")  + ", 1fr))"}}>
                    {props.itemList || null}
                </div>
            </div>
        </div>
    )
}
