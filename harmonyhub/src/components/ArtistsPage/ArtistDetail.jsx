import React, { useEffect, useState } from 'react';
import ArtistsBanner from './components/ArtistsBanner'
// import PopularMusic from './components/PopularMusic'
// import ArtitstsAlbum from './components/ArtitstsAlbum';
// import SingleSong from './components/SingleSong';
// import ArtistsPlaylist from './components/ArtistsPlaylist';
// import AlsoListen from './components/AlsoListen';
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
import { createDemoAlbums, createDemoArtists, createDemoPlaylists, createDemoSongs } from '../../services/demoDataService';
import { formatDate } from '../../services/formatDateService';
import { convertIntToTime } from '../MainPage/services/playbarServices';

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
        const dataSongs = createDemoSongs();
        const dataAlbums = createDemoAlbums();
        const dataPlaylists = createDemoPlaylists();
        const dataArtists = createDemoArtists();

        setPopularSongs(
            dataSongs.map(
                (item, index) => (
                    <MusicBar
                        key={item.id}
                        headerWidth="10vh"
                        title={item.name}
                        subtitle={item.artist}
                        header={"#" + (index + 1)}
                        releaseDate={formatDate(item.releaseDate)}
                        usePlayedCount={item.playCount}
                        time={convertIntToTime(item.duration)}
                        onClick={() => handleOnClickSong(nav, item.id)}
                    ></MusicBar>
                )
            )
        );

        setArtistAlbums(
            dataAlbums.map(
                (item) => (
                    <AlbumBox
                        key={item.id}
                        title={item.title}
                        subtitle={item.description}
                        onClick={() => handleOnClickAlbum(nav, item.id)}
                    ></AlbumBox>
                )
            )
        );     

        setSingleSongs(
            dataSongs.map(
                (item) => (
                    <MusicBox
                        key={item.id}
                        title={item.name}
                        subtitle={item.artist}
                        onClick={() => handleOnClickSong(item.id)}
                    ></MusicBox>
                )
            )
        );

        setArtistPlaylists(
            dataPlaylists.map(
                (item) => (
                    <PlaylistBox
                        key={item.id} 
                        title={item.title}
                        onClick={() => handleOnClickPlaylist(nav, item.id)}
                    />
                )
            )   
        );

        setOtherArtists(
            dataArtists.map(
                (item) => (
                    <ArtistBox
                        key={item.id}
                        title={item.name}
                        onClick={() => handleOnClickArtist(nav, item.id)}
                    ></ArtistBox>
                )
            )
        );

    }, [nav]);

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