import React from 'react';
import PopularMusic from '../ArtistsPage/components/PopularMusic';
import Banner from './components/Banner';

function PlaylistDetail(props) {

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