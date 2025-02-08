import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import hero_img from '../../assets/img/homepage_hero_section.png';
import '../../components/Global.css';
import { AlbumService } from '../../services/apiCall/album';
import { ArtistService } from '../../services/apiCall/artist';
import { SongService } from '../../services/apiCall/song';
import { formatDate, getPreviousDate, getToday } from '../../services/formatDateService';
import { handleOnClickAlbum, handleOnClickArtist, handleOnClickPlaylist, handleOnClickSong } from '../../services/itemOnClickService';
import { navigateToAllPlaylists, navigateToNewReleaseSongs, navigateToTopAlbums } from '../../services/navigateService';
import Footer from '../MainPage/Footer';
import { convertIntToTime } from '../MainPage/services/playbarServices';
import { AlbumBox, ArtistBox, MusicBox, PlaylistBox } from '../SmallComponents/ItemBox';
import ItemCollection from '../SmallComponents/ItemCollection';
import MusicBar from '../SmallComponents/MusicBar';
import MusicCollection from '../SmallComponents/MusicCollection';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
    const nav = useNavigate();
    const [weeklyTopSongs, setWeeklyTopSongs] = useState([]);
    const [newReleaseSongs, setNewReleaseSongs] = useState([]);
    const [trendingSongs, setTrendingSongs] = useState([]);
    const [popularArtists, setPopularArtists] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);
    const [moodPlaylists, setMoodPlaylists] = useState([]);

    const [newReleaseSongsData, setNewReleaseSongsData] = useState([]);

    useEffect(() => {
        // call API to get data
        const controller = new AbortController(); 
        const fetchData =  async () => {
            const today = getToday();

            const fullDataSongs = await SongService.getSongs({
                sortBy: "createdAt",
                order: "desc",
                limit: 50,
            }).songs;
            setNewReleaseSongsData(
                fullDataSongs
            );
            const dataSongs = fullDataSongs.length > 6 ? fullDataSongs.slice(0, 6) : fullDataSongs;
            const dataAlbums = await AlbumService.getRandomAlbums({limit: 6}).albums;
            const dataPlaylists = [];
            const dataArtists = await ArtistService.getArtists({limit: 6}).artists;
            const weeklySongs = await SongService.getMostPlayedSongs({
                numberOfSongs: 6,
                startTime: getPreviousDate(7, today),
                endTime: today, 
            }).songs; 
            const trendingSongsData = await SongService.getMostPlayedSongs({
                numberOfSongs: 6,
            }).songs;

            setWeeklyTopSongs(
                weeklySongs.map(
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
    
            setNewReleaseSongs(
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
    
            setTrendingSongs(
                trendingSongsData.map(
                    (item, index) => (
                        <MusicBar
                            key={item.id}
                            headerWidth="10vh"
                            title={item.name}
                            subtitle={item.artist}
                            header={"#" + (index + 1)}
                            releaseDate={formatDate(item.releaseDate)}
                            data={item}
                            // album="Demo Album"
                            played={item.playCount}
                            time={convertIntToTime(item.duration)}
                            onClick={() => handleOnClickSong(item)}
                        ></MusicBar>
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
        }
 
        fetchData();
        return () => {
            controller.abort(); // Cleanup function: hủy request khi component unmount
        };

    }, [nav]);

    return ( 
        <div className="homepage">
            <div id="hero_section">
                <img src={hero_img} id="hero_img" alt=""></img>
                <div id="hero_content">
                    <p className="hero_title">All the <span className="pink">Best Songs</span> in One Place</p>
                    <p>On our website, you can access an amazing collection of popular and new songs. Stream your favorite tracks in high quality and enjoy without interruptions. Whatever your taste in music, we have it all for you!</p>
                    <div id="hero_buttons">
                        <button
                            id="btn_discover"
                            className="txt_button"
                            onClick={() => {nav('/discover')}}
                        >Discover now</button>
                        <button id="btn_create_playlist" className="txt_button">Create Playlist</button>
                    </div>
                </div>
            </div>
            <div>
                {
                    weeklyTopSongs.length > 0 ?
                        <ItemCollection
                            itemList={weeklyTopSongs}
                            title="Weekly Top"
                            titleHighlight="Songs"
                            onViewAll={() => {nav('/mostplayed')}}
                        ></ItemCollection>
                    : 
                        null
                }
                {
                    newReleaseSongs.length > 0 ?
                        <ItemCollection
                            itemList={newReleaseSongs}
                            title="New Release"
                            titleHighlight="Songs"
                            onViewAll={() => {navigateToNewReleaseSongs(nav, newReleaseSongsData)}}
                        ></ItemCollection>
                    : 
                        null
                }
                {
                    trendingSongs.length > 0 ?
                        <MusicCollection
                            musicList={trendingSongs}
                            title="Trending"
                            titleHighlight="Songs"
                            headerGap="10vh"
                            onViewAll={() => {nav('/mostplayed')}}
                        ></MusicCollection>
                    : 
                        null
                }
                {
                    popularArtists.length > 0 ?
                        <ItemCollection
                            itemList={popularArtists}
                            title="Popular"
                            titleHighlight="Artists"
                            onViewAll={() => {nav('/artist')}}
                        ></ItemCollection>
                    : 
                        null
                }
                {
                    topAlbums.length > 0 ?
                        <ItemCollection
                            itemList={topAlbums}
                            title="Top"
                            titleHighlight="Albums"
                            onViewAll={() => {
                                navigateToTopAlbums(nav);
                            }}
                        ></ItemCollection>
                    : 
                        null
                }
                {
                    moodPlaylists.length > 0 ?
                        <ItemCollection
                            itemList={moodPlaylists}
                            title="Mood"
                            titleHighlight="Playlists"
                            onViewAll={() => {navigateToAllPlaylists(nav, "Mood", "Playlists", "mood-playlists")}}
                        ></ItemCollection>
                    : 
                        null
                }
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;