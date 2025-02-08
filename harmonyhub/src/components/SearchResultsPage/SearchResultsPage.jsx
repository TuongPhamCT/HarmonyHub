import { useEffect, useState } from 'react';
import '../../components/Global.css';
import './SearchResultsPage.css';
import Footer from '../MainPage/Footer';
import { AlbumBox, ArtistBox, MusicBox, PlaylistBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { ToggleButton } from '../SmallComponents/ToggleButton';
import { sComponents } from '../SmallComponents/componentStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleOnClickAlbum, handleOnClickArtist, handleOnClickPlaylist, handleOnClickSong } from '../../services/itemOnClickService';
import { createDemoAlbums, createDemoArtists, createDemoPlaylists, createDemoSongs } from '../../services/demoDataService';
// import { useEffect } from 'react';

const searchTabs = [
    "Song",
    "Album",
    "Playlist",
    "Artist"
]

export default function SearchResultsPage() {
    const nav = useNavigate();

    const [tab, setTab] = useState("Song");
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    const handleTabClick = (tabName) => {
        setTab(tabName);
    }

    const tabs = searchTabs.map(
        (item) => (
            <ToggleButton key={"search-tab-" + item} text={item}
                activeColor="#EE10B0" color="white" width="24vh" height="100%"
                active={tab === item} onClick={() => handleTabClick(item)}/>
        )
    );

    useEffect(() => {
        // use api to get data
        const dataSongs = createDemoSongs();
        const dataAlbums = createDemoAlbums();
        const dataPlaylists = createDemoPlaylists();
        const dataArtists = createDemoArtists();

        setSongs(
            dataSongs.map(
                (item) => (
                    <MusicBox
                        key={item.id}
                        title={item.name}
                        subtitle={item.artist}
                        onClick={() => handleOnClickSong(item)}
                    ></MusicBox>
                )
            )
        );

        setPlaylists(
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

        setAlbums(
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

        setArtists(
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

    // const videoCollection = demoList.map(
    //     (item, index) => (
    //         <MvBox key={"mv-col" + item} title={"video" + item} subtitle="random subtitle" view={index + "M views"}></MvBox>       
    //     )
    // )

    const tabComponents = {
        "Song": 
            <ItemCollectionVertical
                itemList={songs}
                title={"Songs"}
                columnWidth={sComponents.value.musicBoxWidth}
            />,
        "Album": 
            <ItemCollectionVertical 
                itemList={albums}
                title={"Albums"}
                columnWidth={sComponents.value.albumBoxWidth}
            />,
        "Playlist":
            <ItemCollectionVertical 
                itemList={playlists}
                title={"Playlists"}
                columnWidth={sComponents.value.playlistBoxWidth}
            ></ItemCollectionVertical>,
        "Artist":
            <ItemCollectionVertical
                itemList={artists}
                title={"Artists"}
                columnWidth={sComponents.value.artistBoxWidth}
            />,
    }

    return (
        <div id="search-page">
            <p id="search-title">Search Results</p>
            <div id="search-tabs-wrapper">
                <div id="search-tabs-container">
                    {tabs}
                </div>
            </div>
            <hr />
            {
                tabComponents[tab] || null
            }
            <Footer />
        </div>
    );
}
