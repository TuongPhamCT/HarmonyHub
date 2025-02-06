import './DiscoverPage.css';
import { AlbumBox, ArtistBox, GenreBox, MusicBox, PlaylistBox } from '../SmallComponents/ItemBox';
import ItemCollection from '../SmallComponents/ItemCollection';
import Footer from '../MainPage/Footer';
import { navigateToAllPlaylists, navigateToNewReleaseSongs, navigateToTopAlbums } from '../../services/navigateService';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { handleOnClickAlbum, handleOnClickArtist, handleOnClickGenre, handleOnClickPlaylist, handleOnClickSong } from '../../services/itemOnClickService';
import { createDemoAlbums, createDemoArtists, createDemoGenres, createDemoPlaylists, createDemoSongs } from '../../services/demoDataService';

const DiscoverPage = () => {
    const nav = useNavigate();

    const [genres, setGenres] = useState();
    const [moodPlaylists, setMoodPlaylists] = useState();
    const [popularArtists, setPopularArtists] = useState();
    const [newReleaseSongs, setNewReleaseSongs] = useState();
    const [topAlbums, setTopAlbums] = useState();

    useEffect(() => {
        // call api to get data
        const dataSongs = createDemoSongs();
        const dataAlbums = createDemoAlbums();
        const dataPlaylists = createDemoPlaylists();
        const dataArtists = createDemoArtists();
        const dataGenres = createDemoGenres();

        setGenres(
            dataGenres.map(
                (item) => (
                    <GenreBox
                        key={item.id}
                        title={item.name}
                        onClick={() => handleOnClickGenre(nav, item.id, item.name)}
                    ></GenreBox>           
                )
            )
        );

        setMoodPlaylists(
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

        setPopularArtists(
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

        setTopAlbums(
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

        setNewReleaseSongs(
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

    }, [nav]);

    // const videoCollection = demoListVideo.map(
    //     (item, index) => (
    //         <MvBox key={"mv-col" + item} title={"video" + item} subtitle="random subtitle" view={index + "M views"}></MvBox>       
    //     )
    // )

    return (
        
        <div className="discover-page">
            <br/>
            <br/>
            <ItemCollection
                itemList={genres}
                title="Music"
                titleHighlight="Genres"
                onViewAll={() => {nav('/genres')}}
            ></ItemCollection>
            <ItemCollection
                itemList={moodPlaylists}
                title="Mood"
                titleHighlight="Playlist"
                onViewAll={() => {navigateToAllPlaylists(nav, "Mood", "Playlists", "mood-playlists")}}
            ></ItemCollection>
            <ItemCollection
                itemList={popularArtists}
                title="Popular" 
                titleHighlight="Artists"
                onViewAll={() => {nav('/artist')}}
            ></ItemCollection>
            {/* <MvCollection itemList={videoCollection} title="Trending" titleHighlight="Video"></MvCollection> */}
            <ItemCollection
                itemList={newReleaseSongs}
                title="New Release"
                titleHighlight="Songs"
                onViewAll={() => {navigateToNewReleaseSongs(nav)}}
            ></ItemCollection>
            <ItemCollection
                itemList={topAlbums}
                title="Top"
                titleHighlight="Albums"
                onViewAll={() => {navigateToTopAlbums(nav)}}
            ></ItemCollection>
            <Footer/>
        </div>
    );
}

export default DiscoverPage;