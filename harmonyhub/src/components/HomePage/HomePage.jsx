import React from 'react';
import './HomePage.css'; // Import the CSS file for styling
import '../../components/Global.css'
import hero_img from '../../assets/img/homepage_hero_section.png';
import Footer from '../MainPage/Footer';
import ItemBox from '../SmallComponents/ItemBox';
import ItemCollection from '../SmallComponents/ItemCollection';
import MusicBar from '../SmallComponents/MusicBar';
import MusicCollection from '../SmallComponents/MusicCollection';

const demoList = [
    "song1", "song2", "song3", "song4", "song5"
]

const HomePage = () => {
    const collection = demoList.map(
        (item, index) => (
            <ItemBox imageWidth="24vh" imageHeight="24vh" title={item} subtitle="random subtitle" titleHighlight = "Songs"></ItemBox>           
        )
    )

    const musicCollection = demoList.map(
        (item, index) => (
            <MusicBar headerWidth="10vh" title={item} subtitle="random subtitle" header={"#" + (index + 1)}
                releaseDate={"Nov " + (index + 1) + ", 2024"} album="Demo Album" time="2:00"></MusicBar>           
        )
    )

    return (
        <div className="homepage">
            <div id="hero_section">
                <img src={hero_img} id="hero_img" alt=""></img>
                <div id="hero_content">
                    <p class="hero_title">All the <span class="pink">Best Songs</span> in One Place</p>
                    <p>On our website, you can access an amazing collection of popular and new songs. Stream your favorite tracks in high quality and enjoy without interruptions. Whatever your taste in music, we have it all for you!</p>
                    <div id="hero_buttons">
                        <button id="btn_discover" class="txt_button">Discover now</button>
                        <button id="btn_create_playlist" class="txt_button">Create Playlist</button>
                    </div>
                </div>
            </div>
            <div>
                <ItemCollection itemList={collection} title="Weekly Top" titleHighlight="Songs"></ItemCollection>
                <ItemCollection itemList={collection} title="New Release" titleHighlight="Songs"></ItemCollection>
                <MusicCollection musicList={musicCollection} title="Trending" titleHighlight="Songs" headerGap="10vh"></MusicCollection>
                <ItemCollection itemList={collection} title="Top" titleHighlight="Albums"></ItemCollection>
                <ItemCollection itemList={collection} title="Mood" titleHighlight="Playlists"></ItemCollection>
            </div>
            <Footer/>
        </div>
    );
}

export default HomePage;