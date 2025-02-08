import React, { useState } from 'react';
import { useParams } from 'react-router';
import PopularMusic from '../ArtistsPage/components/PopularMusic';
import Banner from './components/Banner';
import PlaylistMusic from './components/PlaylistMusic';

function PlaylistDetail(props) {
    const { playlistId } = useParams();
    return (
        <div className='mt-[8vh] mx-[2vh]'>
            <Banner />
            <PlaylistMusic />
        </div>
    );
}

export default PlaylistDetail;