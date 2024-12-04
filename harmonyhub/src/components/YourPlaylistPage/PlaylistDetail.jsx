import React, { useState } from 'react';
import PlaylistTitle from './PlaylistTitle'
import PlaylistSongs from './PlaylistSongs'

function PlaylistDetail(props) {
    return (
        <div className='mt-[8vh]'>
            <PlaylistTitle />
            <PlaylistSongs />
        </div>
    );
}

export default PlaylistDetail;