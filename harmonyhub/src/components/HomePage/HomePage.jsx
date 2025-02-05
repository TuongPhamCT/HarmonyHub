import React, { useEffect, useState } from 'react';
import './HomePage.css'; // Import the CSS file for styling
import '../../components/Global.css'
import hero_img from '../../assets/img/homepage_hero_section.png';
import Footer from '../MainPage/Footer';
import { MusicBox, AlbumBox, ArtistBox, PlaylistBox } from '../SmallComponents/ItemBox';
import ItemCollection from '../SmallComponents/ItemCollection';
import MusicBar from '../SmallComponents/MusicBar';
import MusicCollection from '../SmallComponents/MusicCollection';
import { useNavigate } from 'react-router';
import { navigateToAllPlaylists, navigateToNewReleaseSongs, navigateToTopAlbums } from '../../services/navigateService';
import { handleOnClickAlbum, handleOnClickArtist, handleOnClickPlaylist, handleOnClickSong } from '../../services/itemOnClickService';

const demoList = [
    "song1", "song2", "song3", "song4", "song5"
]

const HomePage = () => {
    const nav = useNavigate();
    const [weeklyTopSongs, setWeeklyTopSongs] = useState([]);
    const [newReleaseSongs, setNewReleaseSongs] = useState([]);
    const [trendingSongs, setTrendingSongs] = useState([]);
    const [popularArtists, setPopularArtists] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);
    const [moodPlaylists, setMoodPlaylists] = useState([]);

    useEffect(() => {
        // call API to get data

        setWeeklyTopSongs(
            demoList.map(
                (item, index) => (
                    <MusicBox
                        key={"mb-col" + index}
                        title={item}
                        subtitle="random subtitle"
                        onClick={() => handleOnClickSong(nav, item)}
                    ></MusicBox>
                )
            )
        );

        setNewReleaseSongs(
            demoList.map(
                (item, index) => (
                    <MusicBox
                        key={"mb-col" + index}
                        title={item}
                        subtitle="random subtitle"
                        onClick={() => handleOnClickSong(nav, item)}
                    ></MusicBox>
                )
            )
        );

        setTopAlbums(
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

        setPopularArtists(
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

        setTrendingSongs(
            demoList.map(
                (item, index) => (
                    <MusicBar
                        key={"mb" + index}
                        headerWidth="10vh"
                        title={item}
                        subtitle="random subtitle"
                        header={"#" + (index + 1)}
                        releaseDate={"Nov " + (index + 1) + ", 2024"}
                        album="Demo Album"
                        time="2:00"
                        onClick={() => handleOnClickSong(nav, item)}
                    ></MusicBar>
                )
            )
        );

        setMoodPlaylists(
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
                            onViewAll={() => {navigateToNewReleaseSongs(nav)}}
                        ></ItemCollection>
                    : 
                        null
                }
                {
                    weeklyTopSongs.length > 0 ?
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
                    weeklyTopSongs.length > 0 ?
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
                    weeklyTopSongs.length > 0 ?
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
                    weeklyTopSongs.length > 0 ?
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