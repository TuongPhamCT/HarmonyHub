import React from 'react';
import Artistbg from '../../assets/img/artistbackround.png'

function ArtistsBanner(props) {




    return (
        <div className='w-full min-h-[422px] relative bg-cover'
            style={{ backgroundImage: `url(${Artistbg})` }}>
            <div className='absolute bottom-10 left-8'>
                <h4 className='text-7xl font-bold'>Eminem</h4>
            </div>
        </div>
    );
}

export default ArtistsBanner;