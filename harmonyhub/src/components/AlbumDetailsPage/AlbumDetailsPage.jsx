import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import album from '../../assets/img/placeholder/placeholder_album.png';
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
import { serverDomain } from '../../store';
import { sBoxAlts } from '../SmallComponents/componentStore';
import { sAlbumDetail } from './albumDetailStore';

const AlbumDetailsPage = () =>{
    const { id } = useParams();
    const [songs, setSongs] = useState([]);
    const [songsData, setSongsData] = useState([]);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState("");
    const [totalTime, setTotalTime] = useState();

    const handleRemoveSong = useCallback(async (songId) => {
        const newSongData = songsData.filter((i) => songId !== i.id);

        setSongs((prev) => prev.filter((i) => songId !== i.props.data.id));
        setSongsData(newSongData);
        
        const totalTime = newSongData.reduce((acc, item) => acc + item.duration, 0);
        setTotalTime(convertIntToTime(totalTime, true));

        await AlbumService.removeSongFromAlbum(id, songId);
    }, [id]);

    useEffect(() => {
        // call api to get songs by playlist id
        const controller = new AbortController(); 
        const fetchData =  async () => {
            const thisAlbum = await AlbumService.getAlbumById(id);
            const dataSongs = thisAlbum.songs;

            const totalTime = dataSongs.reduce((acc, item) => acc + item.duration, 0);
    
            setTitle(thisAlbum.title);
            setDescription(thisAlbum.description);
            setImage(serverDomain + encodeURI(thisAlbum.image));
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
                            releaseDate={formatDate(item.createdAt)}
                            played={item.playCount}
                            time={convertIntToTime(item.duration)}
                            onClick={() => handleOnClickSong(item)}
                            boxAlt={sAlbumDetail.value.owned ? sBoxAlts.value.musicBoxInUserAlbum : ""}
                            albumId={id}
                            onRemove={() => handleRemoveSong(item.id)}
                        ></MusicBar>       
                    )
                )
            );
        }

        fetchData();
        return () => {
            controller.abort(); // Cleanup function: hủy request khi component unmount
        };
    }, [id, handleRemoveSong]);

    const handleImageError = (e) => {
        e.target.onerror = null; // Prevents infinite loop if placeholder fails
        e.target.src = album; // Placeholder image URL
    };

    return( 
        <div>
            <div className='album-details-page'>
                <div id="app_bar">
                    <div id="app_bar_content">
                        
                        <img src={image} id="album_img" onError={handleImageError} alt=""></img>
                        <div className="album-text">
                            <p className="album-title">{title} {/*<span className="pink">Mix</span>*/}</p>
                            <div className="album-desscription">
                                <h3>{description}</h3>
                            </div>
                            <h3>{songs.length} Songs <span className="pinkpro">.</span> {totalTime}</h3>
                        </div>
                        {
                            songs.length > 0 ?
                                <div className="album-action" onClick={() => handlePlayAllAlbum(id, songsData)}>
                                    <h2 >Play All</h2>
                                    <img src={playBTN} alt=""></img>
                                </div>
                            : null
                        }

                    </div>
                </div>
                {
                    songs.length > 0 ?
                        <div>
                            <MusicCollection
                                musicList={songs}
                                headerGap="10vh"
                                usePlayedCount={true}
                                disableViewAll={true}
                            ></MusicCollection>
                        </div>
                    : null
                }
                <Footer/>
            </div>
            
        </div>
    );    
}

export default AlbumDetailsPage;