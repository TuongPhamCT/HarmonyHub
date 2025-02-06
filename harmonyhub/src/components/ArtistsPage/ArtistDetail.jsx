import React, { useEffect, useState } from 'react';
import ArtistsBanner from './components/ArtistsBanner'
import PopularMusic from './components/PopularMusic'
import ArtitstsAlbum from './components/ArtitstsAlbum';
import SingleSong from './components/SingleSong';
import ArtistsPlaylist from './components/ArtistsPlaylist';
import AlsoListen from './components/AlsoListen';
import { useNavigate, useParams } from 'react-router';
import Footer from '../MainPage/Footer';
import MusicCollection from '../SmallComponents/MusicCollection';
import { handleOnClickAlbum, handleOnClickArtist, handleOnClickPlaylist, handleOnClickSong } from '../../services/itemOnClickService';
import MusicBar from '../SmallComponents/MusicBar';
import { AlbumBox, ArtistBox, MusicBox, PlaylistBox } from '../SmallComponents/ItemBox';
import { navigateToAllAlbums, navigateToAllPlaylists, navigateToAllSongs } from '../../services/navigateService';
import { sComponents } from '../SmallComponents/componentStore';
import ItemCollection from '../SmallComponents/ItemCollection';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';

const demoList = [
    "song1", "song2", "song3", "song4", "song5"
]

function ArtitstsPage(props) {
    const nav = useNavigate();
    const { id } = useParams();

    const [popularSongs, setPopularSongs] = useState([]);
    const [artistAlbums, setArtistAlbums] = useState([]);
    const [singleSongs, setSingleSongs] = useState([]);
    const [artistPlaylists, setArtistPlaylists] = useState([]);
    const [otherArtists, setOtherArtists] = useState([]);

    useEffect(() => {
        // api call to get data
        
        setPopularSongs(
            demoList.map(
                (item, index) => (
                    <MusicBar
                        key={"mb" + index}
                        headerWidth="10vh"
                        title={item}
                        subtitle="random subtitle"
                        header={"#" + (index + 1)}
                        releaseDate={"Nov " + (index + 1) + ", 2024"}
                        played={100000}
                        time="2:00"
                        onClick={() => handleOnClickSong(item)}
                    ></MusicBar>
                )
            )
        );

        setArtistAlbums(
            demoList.map(
                (item, index) => (
                    <AlbumBox
                        key={"al-col" + index}
                        title={"album " + index}
                        subtitle="random subtitle"
                        onClick={() => handleOnClickAlbum(nav, item)}
                    ></AlbumBox>
                )
            )
        );     

        setSingleSongs(
            demoList.map(
                (item, index) => (
                    <MusicBox
                        key={"mb-col" + index}
                        title={item}
                        subtitle="random subtitle"
                        onClick={() => handleOnClickSong(item)}
                    ></MusicBox>
                )
            )
        );

        setArtistPlaylists(
            demoList.map(
                (item, index) => (
                    <PlaylistBox
                        key={"al-col" + index} 
                        title={"playlist " + index}
                        onClick={() => handleOnClickPlaylist(nav, item)}
                    />
                )
            )   
        );

        setOtherArtists(
            demoList.map(
                (item, index) => (
                    <ArtistBox
                        key={"al-col" + index}
                        title={"artist " + index}
                        subtitle="random subtitle"
                        onClick={() => handleOnClickArtist(nav, item)}
                    ></ArtistBox>
                )
            )
        );

    }, []);

    const handleViewAllPopularSongs = () => {

    }

    return (
        <div className='h-full mt-[8vh] mx-9 flex flex-col gap-10 bg-black'>
            <ArtistsBanner name={"Alex"} />
            {/* <PopularMusic /> */}

            <MusicCollection
                musicList={popularSongs}
                title="Popular"
                titleHighlight="Musics"
                headerGap="10vh"
                usePlayedCount={true}
                disableViewAll={true}
                onViewAll={handleViewAllPopularSongs}
            ></MusicCollection>

            {/* <ArtitstsAlbum /> */}

            <ItemCollection
                itemList={artistAlbums}
                title="Artist's"
                titleHighlight="Albums"
                onViewAll={() => {navigateToAllAlbums(nav, "Artist's", "Albums", "artist-albums")}}
            ></ItemCollection>

            {/* <SingleSong /> */}

            <ItemCollection
                itemList={singleSongs}
                title="Single"
                titleHighlight="Songs"
                onViewAll={() => {navigateToAllSongs(nav, "Artist's", "Songs", "single-songs")}}
            ></ItemCollection>

            {/* <ArtistsPlaylist /> */}

            <ItemCollection
                itemList={artistPlaylists}
                title="Artist's"
                titleHighlight="Playlists"
                onViewAll={() => {navigateToAllPlaylists(nav, "Artist's", "Playlists", "artist-playlists")}}
            ></ItemCollection>

            {/* <AlsoListen /> */}
            <ItemCollectionVertical
                itemList={otherArtists}
                title={"'Artist' Fans"}
                titleHighlight={"Also Listen To"}
                columnWidth={sComponents.value.artistBoxWidth}
            ></ItemCollectionVertical>
            <Footer/>
        </div>
    );
}

export default ArtitstsPage;