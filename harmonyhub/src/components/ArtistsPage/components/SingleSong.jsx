import React from 'react';
import ItemCollection from '../../SmallComponents/ItemCollection';
import { MusicBox } from '../../SmallComponents/ItemBox';

const demoList = [
    "1", "2", "3", "4", "5", "6"
];

function SingleSong(props) {
    const singleSong = demoList.map(
        (item, index) => (
            <MusicBox key={"m-col" + index} title={item} subtitle="random subtitle" />
        )
    )

    return (
        <div>
            <ItemCollection itemList={singleSong} title="Single" titleHighlight="Songs"></ItemCollection>        </div>
    );
}

export default SingleSong;