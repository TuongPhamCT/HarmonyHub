import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import album from '../../assets/img/placeholder_disc.png';
import playBTN from '../../assets/img/play_music.png';
import '../../components/Global.css';
import { PlaylistService } from '../../services/apiCall/playlist';
import { formatDate } from '../../services/formatDateService';
import { handleOnClickSong } from '../../services/itemOnClickService';
import Footer from '../MainPage/Footer';
import { convertIntToTime, handlePlayAllPlaylist } from '../MainPage/services/playbarServices';
import MusicBar from '../SmallComponents/MusicBar';
import MusicCollection from '../SmallComponents/MusicCollection';
import './PlaylistDetailPage.css';

const PlaylistDetailPage = () =>{
    const { id } = useParams();
    const [songs, setSongs] = useState([]);
    const [songsData, setSongsData] = useState([]);
    const [title, setTitle] = useState();
    // const [description, setDescription] = useState();
    const [totalTime, setTotalTime] = useState();

    useEffect(() => {
        // call api to get songs by playlist id
        const controller = new AbortController(); 
        const fetchData =  async () => {
            const thisPlaylist = await PlaylistService.getPlaylistById(id);
            const dataSongs = await PlaylistService.getPlaylistSongs(
                id,
                {
                    sortBy: "createdAt",
                    order: "asc"
                }
            ).songs;
 
            const totalTime = dataSongs.reduce((acc, item) => acc + item.duration, 0);
    
            setTitle(thisPlaylist.title);
            // setDescription();
            setTotalTime(convertIntToTime(totalTime, true));
            setSongsData(dataSongs);
    
            setSongs(
                dataSongs.map(
                    (item, index) => (
                        <MusicBar
                            key={item.id}
                            data={item}
                            headerWidth="10vh"
                            title={item.name}
                            subtitle={item.artist}
                            header={"#" + (index + 1)}
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
            <div className='playlist-details-page'>
                <div id="app_bar">
                    <div id="app_bar_content">
                        
                        <img src={album} id="playlist_img" alt=''></img>
                        <div className="playlist-text">
                            <p className="playlist-title">{title} {/*<span className="pink">Mix</span>*/}</p>
                            <div className="playlist-desscription">
                                <h3>{""}</h3>
                            </div>
                            <h3>{songs.length} Songs <span className="pinkpro">.</span> {totalTime}</h3>
                        </div>
                        <div className="playlist-action" onClick={() => handlePlayAllPlaylist(id, songsData)}>
                            <h2 >Play All</h2>
                            <img src={playBTN} alt=''></img>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        songs.length > 0 ?
                            <MusicCollection
                                musicList={songs}
                                headerGap="10vh"
                                usePlayedCount={true}
                                disableViewAll={true}
                            ></MusicCollection>
                        :
                            null
                    }
                </div>
                <Footer/>
            </div>
            
        </div>
    );    
}

export default PlaylistDetailPage;