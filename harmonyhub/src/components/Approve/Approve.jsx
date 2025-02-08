import React, { useEffect, useState } from 'react';
import '../../components/Global.css';
import { SongService } from '../../services/apiCall/song';
import { convertIntToTime } from '../../services/convertIntToTimeService';
import { formatDate } from '../../services/formatDateService';
import { handleOnClickSong } from '../../services/itemOnClickService';
import '../HomePage/HomePage.css'; // Import the CSS file for styling
import AdminMusicCollection from '../SmallComponents/AdminMusicCollection';
import ApproveMusicBar from '../SmallComponents/ApproveMusicBar';


const ApprovePage = () => {
    
    const [pendingSongs, setPendingSongs] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            const songsData = await SongService.getPendingApprovalSongs({
                sortBy: "createdAt",
                order: "desc"
            }).songs || [];

            setPendingSongs(
                songsData.map(
                    (item, index) => (
                        <ApproveMusicBar
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
                            onRemove={() => {
                                setPendingSongs((prev) => prev.filter((sSong) => item.id !== sSong.props.data.id));
                            }}
                        ></ApproveMusicBar>
                    )
                )
            );
            
        }

        fetchData();
        return () => {
            controller.abort(); // Cleanup function: hủy request khi component unmount
        };
    }, []);

    return (
        <div className="homepage">
            <br/>
            <br/>
            <div>
                <AdminMusicCollection musicList={pendingSongs} title="New" titleHighlight="Songs" headerGap="10vh"></AdminMusicCollection>
            </div>
        </div>
    );
}

export default ApprovePage;