import React from 'react';
import '../../components/Global.css'
import './AlbumDetailsPage.css'
import Footer from '../MainPage/Footer';
import ItemBox from '../SmallComponents/ItemBox';
import ItemCollection from '../SmallComponents/ItemCollection';
import MusicBar from '../SmallComponents/MusicBar';
import MusicCollection from '../SmallComponents/MusicCollection';
import album from '../../assets/img/placeholder_disc.png';
import back_btn from '../../assets/img/header_back.png';
// import { FaPlay, FaShareAlt, FaHeart, FaEllipsisH } from "react-icons/fa";

const demoList = [
    "song1", "song2", "song3", "song4", "song5","song6","song7","song8"
]

const AlbumDetailsPage = () =>{
    const musicCollection = demoList.map(
        (item, index) => (
            <MusicBar key={"mb" + index} headerWidth="10vh" title={item} subtitle="random subtitle" header={"#" + (index + 1)}
                releaseDate={"Nov " + (index + 1) + ", 2024"} album="Demo Album" time="2:00"></MusicBar>           
        )
    )

    return( 
    
    <div className='album-details-page'>
        <div id="hero_section">
            <div id="hero_content">
                <div className='column'>
                    <img src={album}></img>
                </div>
                <div className='column middle-column'>
                    <div class="row">Text Row 1</div>
                    <div class="row">Text Row 2</div>
                    <div class="row">Text Row 3</div>
                </div>
                <div className='column'>
                    <p className="hero_title">Trending songs <span className="pink">Mix</span></p>
                </div>
            </div>
        </div>
        <div>
            <MusicCollection musicList={musicCollection} headerGap="10vh"></MusicCollection>
        </div>
        <Footer> </Footer>
    </div>
    );    
}

export default AlbumDetailsPage;

{/* <p className="hero_title">Trending songs <span className="pink">Mix</span></p>
<p>tate mcree, nightmares, the neighborhood, doja cat and ...</p> */}