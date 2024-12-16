import React from 'react';
import '../../components/Global.css'
import './AlbumDetailsPage.css'
import Footer from '../MainPage/Footer';
import MusicBar from '../SmallComponents/MusicBar';
import MusicCollection from '../SmallComponents/MusicCollection';
import album from '../../assets/img/placeholder_disc.png';
import playBTN from '../../assets/img/play_music.png';

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
        <div>
            <div className='album-details-page'>
                <div id="app_bar">
                    <div id="app_bar_content">
                        
                        <img src={album} id="album_img"></img>
                        <div className="album-text">
                            <p className="album-title">Trending Songs <span className="pink">Mix</span></p>
                            <div className="album-desscription">
                                <h3>tate mcree, nightmares, the neighberhood, doja cat and ...</h3>
                            </div>
                            <h3>20 Songs <span className="pinkpro">.</span> 1h36m</h3>
                        </div>
                        <div className="album-action">
                            <h2 >Play All</h2>
                            <img src={playBTN}></img>
                        </div>
                    </div>
                </div>
                <div>
                    <MusicCollection musicList={musicCollection} headerGap="10vh"></MusicCollection>
                </div>
                <Footer/>
            </div>
            
        </div>
    );    
}

export default AlbumDetailsPage;