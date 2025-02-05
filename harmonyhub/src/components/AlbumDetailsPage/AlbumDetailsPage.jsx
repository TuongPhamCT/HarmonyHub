import React, { useEffect, useState } from 'react';
import '../../components/Global.css'
import './AlbumDetailsPage.css'
import Footer from '../MainPage/Footer';
import MusicBar from '../SmallComponents/MusicBar';
import MusicCollection from '../SmallComponents/MusicCollection';
import album from '../../assets/img/placeholder_disc.png';
import playBTN from '../../assets/img/play_music.png';
import { useParams } from 'react-router';
import { handleOnClickSong } from '../../services/itemOnClickService';

const demoList = [
    "song1", "song2", "song3", "song4", "song5","song6","song7","song8"
]

const AlbumDetailsPage = () =>{
    const { id } = useParams();
    const [songs, setSongs] = useState([]);

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [totalTime, setTotalTime] = useState();

    useEffect(() => {
        // call api to get songs by playlist id

        setTitle("Title");
        setDescription("Description");
        setTotalTime("1h36m");

        setSongs(
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
                        onClick={() => handleOnClickSong(item)}
                    ></MusicBar>           
                )
            )
        );
    }, []);

    return( 
        <div>
            <div className='album-details-page'>
                <div id="app_bar">
                    <div id="app_bar_content">
                        
                        <img src={album} id="album_img" alt=""></img>
                        <div className="album-text">
                            <p className="album-title">{title} {/*<span className="pink">Mix</span>*/}</p>
                            <div className="album-desscription">
                                <h3>{description}</h3>
                            </div>
                            <h3>{songs.length} Songs <span className="pinkpro">.</span> {totalTime}</h3>
                        </div>
                        <div className="album-action">
                            <h2 >Play All</h2>
                            <img src={playBTN} alt=""></img>
                        </div>
                    </div>
                </div>
                <div>
                    <MusicCollection
                        musicList={songs}
                        headerGap="10vh"
                        disableViewAll={true}
                    ></MusicCollection>
                </div>
                <Footer/>
            </div>
            
        </div>
    );    
}

export default AlbumDetailsPage;