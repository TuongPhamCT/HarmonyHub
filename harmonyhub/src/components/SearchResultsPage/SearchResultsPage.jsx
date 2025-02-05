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
// import { useEffect } from 'react';

const demoList = [
    "song1", "song2", "song3", "song4", "song5", "song6", "song7", "song8"
]

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

        setSongs(
            demoList.map(
                (item, index) => (
                    <MusicBox
                        key={"search-song-" + index}
                        title={item}
                        subtitle="random subtitle"
                        onClick={() => handleOnClickSong(item)}
                    ></MusicBox>
                )
            )
        );

        setPlaylists(
            demoList.map(
                (item) => (
                    <PlaylistBox
                        key={"pl-col" + item}
                        title={"playlist" + item}
                        onClick={() => handleOnClickPlaylist(nav, item)}
                    ></PlaylistBox>       
                )
            )        
        );

        setAlbums(
            demoList.map(
                (item) => (
                    <AlbumBox
                        key={"al-col" + item}
                        title={"album " + item}
                        subtitle="random subtitle"
                        onClick={() => handleOnClickAlbum(nav, item)}
                    ></AlbumBox>           
                )
            )
        );

        setArtists(
            demoList.map(
                (item) => (
                    <ArtistBox
                        key={"artist-" + item}
                        title={"artist " + item}
                        onClick={() => handleOnClickArtist(nav, item)}
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
