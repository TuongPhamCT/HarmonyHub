import React, { useState } from 'react';
import { useParams } from 'react-router';
import PopularMusic from '../ArtistsPage/components/PopularMusic';
import Banner from './components/Banner';

function PlaylistDetail(props) {
    const { playlistId } = useParams();
    return (
        <div className='mt-[8vh] mx-[2vh]'>
            <Banner />
            <div className='bg-[#134D91]'>
                <PopularMusic />
            </div>
        </div>
    );
}

export default PlaylistDetail;