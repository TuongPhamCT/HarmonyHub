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
import { createDemoPlaylists } from '../../services/demoDataService';

const AllPlaylistsPage = () => {
    const nav = useNavigate();
    const { id } = useParams();

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        // call API to get data
        const dataPlaylists = createDemoPlaylists();

        setPlaylists(
            dataPlaylists.map(
                (item) => (
                    <PlaylistBox
                        key={item.id} 
                        title={item.title}
                        onClick={() => handleOnClickPlaylist(nav, item.id)}
                    />
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