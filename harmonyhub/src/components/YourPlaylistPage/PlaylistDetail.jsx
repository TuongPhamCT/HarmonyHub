import React from 'react';
import PopularMusic from '../ArtistsPage/components/PopularMusic';
import Banner from './components/Banner';
import PlaylistMusic from './components/PlaylistMusic';

function PlaylistDetail(props) {

    return (
        <div className='mt-[8vh] mx-[2vh]'>
            <Banner />
            <PlaylistMusic />
        </div>
    );
}

export default PlaylistDetail;