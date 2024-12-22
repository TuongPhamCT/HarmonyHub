import React from 'react';
import ItemCollection from '../SmallComponents/ItemCollection';
import { ArtistBox } from '../SmallComponents/ItemBox';

const demoList = [
    "1", "2", "3", "4", "5", "6"
];

function AlsoListen(props) {
    const alsoListen = demoList.map(
        (item, index) => (
            <ArtistBox key={"art-col" + index} title={"artist " + index} />
        )
    )

    return (
        <div>
            <ItemCollection itemList={alsoListen} title="Eminem Fans" titleHighlight="Also Listen To"></ItemCollection>
        </div>
    );
}

export default AlsoListen;