//import { useParams } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../../components/Global.css';
import { PlaylistService } from '../../services/apiCall/playlist';
import { handleOnClickPlaylist } from '../../services/itemOnClickService';
import Footer from '../MainPage/Footer';
import { sBoxAlts, sComponents } from '../SmallComponents/componentStore';
import { PlaylistBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import './AllPlaylistsPage.css';

const YourPlaylistsPage = () => {
    const nav = useNavigate();
    //const { id } = useParams();

    const [playlists, setPlaylists] = useState([]);

    const [forceUpdate, setForceUpdate] = useState(false);

    const handleRemovePlaylist = useCallback((id) => {
        setPlaylists((prev) => prev.filter((i) => id !== i.props.data.id));
    }, []);

    const handleUpdatePlaylist = useCallback(() => {
        setForceUpdate(true);
    }, []);


    // initialize

    useEffect(() => {

        // call API to get data
        const controller = new AbortController();
        const fetchData = async () => {
            const dataPlaylists = await PlaylistService.getMyPlaylists() || [];

            setPlaylists(
                dataPlaylists.map(
                    (item) => (
                        <PlaylistBox
                            key={item.id}
                            title={item.title}
                            image={item.image}
                            data={item}
                            boxAlt={sBoxAlts.value.playlistBoxOfUser}
                            onClick={() => handleOnClickPlaylist(nav, item.id, item.title, true)}
                            onUpdate={(newItem) => handleUpdatePlaylist(newItem, item)}
                            onRemove={() => handleRemovePlaylist(item.id)}
                        />
                    )
                )
            );
        }

        fetchData();
        return () => {
            controller.abort(); // Cleanup function: hủy request khi component unmount
        };

    }, [nav, forceUpdate, handleUpdatePlaylist, handleRemovePlaylist]);

    return (
        <div id="all-songs-page">
            <ItemCollectionVertical
                itemList={playlists}
                title={"Your"}
                titleHighlight={"Playlist"}
                columnWidth={sComponents.value.playlistBoxWidth}
            ></ItemCollectionVertical>
            <Footer />
        </div>
    );
}

export default YourPlaylistsPage;