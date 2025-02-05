//import { useParams } from 'react-router';
import '../../components/Global.css';
import './AllPlaylistsPage.css';
import Footer from '../MainPage/Footer';
import { sComponents } from '../SmallComponents/componentStore';
import { PlaylistBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { sPlaylists } from './playlistStore';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { handleOnClickPlaylist } from '../../services/itemOnClickService';

const demoList = [
    "song1", "song2", "song3", "song4", "song5", "song6", "song7", "song8"
]

const AllPlaylistsPage = () => {
    const nav = useNavigate();
    const { id } = useParams();

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        setPlaylists(
            demoList.map(
                (item, index) => (
                <PlaylistBox
                    key={index}
                    title={item}
                    subtitle="random subtitle"
                    onClick={() => handleOnClickPlaylist(nav, item)}
                ></PlaylistBox>           
                )
            )
        );

    }, [nav]);

    return (
        <div id="all-songs-page">
            <ItemCollectionVertical
                itemList={playlists}
                title={sPlaylists.value.title}
                titleHighlight={sPlaylists.value.titleHighlight}
                columnWidth={sComponents.value.playlistBoxWidth}
            ></ItemCollectionVertical>
            <Footer/>
        </div>
    );
}

export default AllPlaylistsPage;