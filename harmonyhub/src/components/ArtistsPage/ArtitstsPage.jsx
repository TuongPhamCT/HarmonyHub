import React from 'react';
import ArtistsBanner from './ArtistsBanner'
import PopularMusic from './PopularMusic'
import ArtitstsAlbum from './ArtitstsAlbum';
import SingleSong from './SingleSong';
import ArtistsPlaylist from './ArtistsPlaylist';
import AlsoListen from './AlsoListen';


function ArtitstsPage(props) {

    return (
        <div className='h-full mt-[8vh] mx-9 flex flex-col gap-10 bg-black'>
            <ArtistsBanner />
            <PopularMusic />
            <ArtitstsAlbum />
            <SingleSong />
            <ArtistsPlaylist />
            <AlsoListen />
        </div>
    );
}

export default ArtitstsPage;