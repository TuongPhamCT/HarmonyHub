import React from 'react';
import ItemCollection from '../../SmallComponents/ItemCollection';
import { AlbumBox } from '../../SmallComponents/ItemBox';

const demoList = [
    "1", "2", "3", "4", "5", "6"
];

function ArtitstsAlbum(props) {
    const artistAlbum = demoList.map(
        (item) => (
            <AlbumBox key={"al-col" + item} title={"album " + item} subtitle="random subtitle"></AlbumBox>
        )
    )

    return (
        <div>
            <ItemCollection itemList={artistAlbum} title="Artist's" titleHighlight="Albums"></ItemCollection>
        </div>
    );
}

export default ArtitstsAlbum;