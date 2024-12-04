import React from 'react';
import { PlaylistBox } from '../SmallComponents/ItemBox';
import ItemCollection from '../SmallComponents/ItemCollection';

const demoList = [
    "1", "2", "3", "4", "5", "6"
];

function ArtistsPlaylist(props) {
    const artistsPlaylist = demoList.map(
        (item, index) => (
            <PlaylistBox key={"pl-col" + index} title={"playlist " + index} />
        )
    )

    return (
        <div>
            <ItemCollection itemList={artistsPlaylist} title="Artist's" titleHighlight="Playlist" />
        </div>
    );
}

export default ArtistsPlaylist;