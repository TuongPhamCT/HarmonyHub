import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import album from '../../assets/img/placeholder_disc.png';
import playBTN from '../../assets/img/play_music.png';
import '../../components/Global.css';
import { AlbumService } from '../../services/apiCall/album';
import { formatDate } from '../../services/formatDateService';
import { handleOnClickSong } from '../../services/itemOnClickService';
import Footer from '../MainPage/Footer';
import { convertIntToTime, handlePlayAllAlbum } from '../MainPage/services/playbarServices';
import MusicBar from '../SmallComponents/MusicBar';
import MusicCollection from '../SmallComponents/MusicCollection';
import './AlbumDetailsPage.css';

const AlbumDetailsPage = () =>{
    const { id } = useParams();
    const [songs, setSongs] = useState([]);
    const [songsData, setSongsData] = useState([]);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [totalTime, setTotalTime] = useState();

    useEffect(() => {
        // call api to get songs by playlist id
        const controller = new AbortController(); 
        const fetchData =  async () => {
            const thisAlbum = await AlbumService.getAlbumById(id);
            const dataSongs = thisAlbum.songs;

            const totalTime = dataSongs.reduce((acc, item) => acc + item.duration, 0);
    
            setTitle(thisAlbum.title);
            setDescription(thisAlbum.description);
            setTotalTime(convertIntToTime(totalTime, true));
            setSongsData(dataSongs);
    
            setSongs(
                dataSongs.map(
                    (item, index) => (
                        <MusicBar
                            key={item.id}
                            headerWidth="10vh"
                            title={item.name}
                            subtitle={item.artist}
                            header={"#" + (index + 1)}
                            data={item}
                            image={item.image}
                            releaseDate={formatDate(item.releaseDate)}
                            played={item.playCount}
                            time={convertIntToTime(item.duration)}
                            onClick={() => handleOnClickSong(item)}
                        ></MusicBar>       
                    )
                )
            );
        }

        fetchData();
        return () => {
            controller.abort(); // Cleanup function: hủy request khi component unmount
        };
    }, [id]);

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
                        <div className="album-action" onClick={() => handlePlayAllAlbum(id, songsData)}>
                            <h2 >Play All</h2>
                            <img src={playBTN} alt=""></img>
                        </div>
                    </div>
                </div>
                <div>
                    <MusicCollection
                        musicList={songs}
                        headerGap="10vh"
                        usePlayedCount={true}
                        disableViewAll={true}
                    ></MusicCollection>
                </div>
                <Footer/>
            </div>
            
        </div>
    );    
}

export default AlbumDetailsPage;