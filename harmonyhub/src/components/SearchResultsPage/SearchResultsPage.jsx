import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../../components/Global.css';
import { AlbumService } from '../../services/apiCall/album';
import { ArtistService } from '../../services/apiCall/artist';
import { SongService } from '../../services/apiCall/song';
import { handleOnClickAlbum, handleOnClickArtist, handleOnClickPlaylist, handleOnClickSong } from '../../services/itemOnClickService';
import Footer from '../MainPage/Footer';
import { AlbumBox, ArtistBox, MusicBox, PlaylistBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { ToggleButton } from '../SmallComponents/ToggleButton';
import { sComponents } from '../SmallComponents/componentStore';
import './SearchResultsPage.css';
import { checkSearchResult } from './services/checkSearchResultService';
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
        const controller = new AbortController(); 
        const fetchData =  async () => {
            const dataSongs = await SongService.getSongs({
                sortBy: "createdAt",
                order: "desc"
            }) || [];
            const dataAlbums = await AlbumService.getAlbums() || [];
            const dataPlaylists = [];
            const dataArtists = await ArtistService.getArtists({
                sortBy: "name",
                order: "asc"
            }) || [];
    
            setSongs(
                dataSongs.filter((data) => checkSearchResult(keyword, data.name)).map(
                    (item) => (
                        <MusicBox
                            key={item.id}
                            title={item.name}
                            subtitle={item.artist}
                            data={item}
                            onClick={() => handleOnClickSong(item)}
                        ></MusicBox>
                    )
                )
            );
    
            setPlaylists(
                dataPlaylists.filter((data) => checkSearchResult(keyword, data.title)).map(
                    (item) => (
                        <PlaylistBox
                            key={item.id} 
                            title={item.title}
                            data={item}
                            onClick={() => handleOnClickPlaylist(nav, item.id)}
                        />
                    )
                )        
            );
    
            setAlbums(
                dataAlbums.filter((data) => checkSearchResult(keyword, data.title)).map(
                    (item) => (
                        <AlbumBox
                            key={item.id}
                            title={item.title}
                            data={item}
                            subtitle={item.description}
                            onClick={() => handleOnClickAlbum(nav, item.id)}
                        ></AlbumBox>
                    )
                )
            );
    
            setArtists(
                dataArtists.filter((data) => checkSearchResult(keyword, data.name)).map(
                    (item) => (
                        <ArtistBox
                            key={item.id}
                            title={item.name}
                            data={item}
                            onClick={() => handleOnClickArtist(nav, item.id)}
                        ></ArtistBox>
                    )
                )
            );
        }

        fetchData();
        return () => {
            controller.abort(); // Cleanup function: hủy request khi component unmount
        };

    }, [nav, keyword]);

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
