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
import { createDemoAlbums, createDemoSongs } from '../../services/demoDataService';
import { formatDate } from '../../services/formatDateService';
import { convertIntToTime } from '../MainPage/services/playbarServices';

const AlbumDetailsPage = () =>{
    const { id } = useParams();
    const [songs, setSongs] = useState([]);

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [totalTime, setTotalTime] = useState();

    useEffect(() => {
        // call api to get songs by playlist id
        const dataSongs = createDemoSongs();

        const album = createDemoAlbums().at(0); 
        const totalTime = dataSongs.reduce((acc, item) => acc + item.duration, 0);

        setTitle(album.title);
        setDescription(album.description);
        setTotalTime(formatDate(totalTime));

        setSongs(
            dataSongs.map(
                (item, index) => (
                    <MusicBar
                        key={item.id}
                        headerWidth="10vh"
                        title={item.name}
                        subtitle={item.artist}
                        header={"#" + (index + 1)}
                        releaseDate={formatDate(item.releaseDate)}
                        usePlayedCount={item.playCount}
                        time={convertIntToTime(item.duration)}
                        onClick={() => handleOnClickSong(item.id)}
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