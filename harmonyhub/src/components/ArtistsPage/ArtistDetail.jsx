import React from 'react';
import ArtistsBanner from './components/ArtistsBanner'
import PopularMusic from './components/PopularMusic'
import ArtitstsAlbum from './components/ArtitstsAlbum';
import SingleSong from './components/SingleSong';
import ArtistsPlaylist from './components/ArtistsPlaylist';
import AlsoListen from './components/AlsoListen';
import { useParams } from 'react-router';


function ArtitstsPage(props) {

    const { id } = useParams();

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