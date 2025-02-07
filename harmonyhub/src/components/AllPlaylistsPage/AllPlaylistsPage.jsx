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
        const dataPlaylists = [
            { id: 1, title: 'Playlist 1' },
            { id: 2, title: 'Playlist 2' },
            { id: 3, title: 'Playlist 3' },
            { id: 4, title: 'Playlist 4' },
            { id: 5, title: 'Playlist 5' },
            { id: 6, title: 'Playlist 6' },
            { id: 7, title: 'Playlist 7' },
            { id: 8, title: 'Playlist 8' },
            { id: 9, title: 'Playlist 9' },
            { id: 10, title: 'Playlist 10' },
        ]

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
            <Footer />
        </div>
    );
}

export default AllPlaylistsPage;