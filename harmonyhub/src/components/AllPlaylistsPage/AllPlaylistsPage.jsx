//import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../../components/Global.css';
import { handleOnClickPlaylist } from '../../services/itemOnClickService';
import Footer from '../MainPage/Footer';
import { sComponents } from '../SmallComponents/componentStore';
import { PlaylistBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import './AllPlaylistsPage.css';
import { sPlaylists } from './playlistStore';

const AllPlaylistsPage = () => {
    const nav = useNavigate();
    //const { id } = useParams();

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        // call API to get data
        const dataPlaylists = sPlaylists.value.playlists;

        setPlaylists(
            dataPlaylists.map(
                (item) => (
                    <PlaylistBox
                        key={item.id}
                        title={item.title}
                        image={item.image}
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
            <Footer />
        </div>
    );
}

export default AllPlaylistsPage;