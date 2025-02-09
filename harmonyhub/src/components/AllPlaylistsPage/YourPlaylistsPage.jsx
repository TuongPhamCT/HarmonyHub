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
import { TextButton } from '../SmallComponents/TextButton';
import { CreatePlaylist } from '../SmallComponents/partials/CreatePlaylist';
import { toggleMainContentScroll } from '../MainPage/services/contentAreaServices';

const YourPlaylistsPage = () => {
    const nav = useNavigate();
    //const { id } = useParams();

    const [playlists, setPlaylists] = useState([]);

    const [forceUpdate, setForceUpdate] = useState(false);
    const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

    const handleRemovePlaylist = useCallback((id) => {
        setPlaylists((prev) => prev.filter((i) => id !== i.props.data.id));
    }, []);

    const handleUpdatePlaylist = useCallback(() => {
        setForceUpdate(!forceUpdate);
    }, [forceUpdate]);


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

    }, [nav, handleUpdatePlaylist, handleRemovePlaylist]);

    return (
        <div id="all-playlists-page">
            <div id="all-playlists-title-wrapper">
                <p id="all-playlists-title">Your Playlist</p>
                <TextButton
                    text="Add new"
                    borderColor="#0E9EEF"
                    backgroundColor="#0E9EEF"
                    color="white"
                    width="18vh"
                    height="100%"
                    onClick={() => {
                        setShowCreatePlaylist(true);
                        toggleMainContentScroll(false);
                    }}
                />
            </div>
            <hr></hr>
            <ItemCollectionVertical
                itemList={playlists}
                title={""}
                titleHighlight={""}
                columnWidth={sComponents.value.playlistBoxWidth}
            ></ItemCollectionVertical>
            <Footer />

            {
                showCreatePlaylist && (
                    <CreatePlaylist onClose={() => {
                        setShowCreatePlaylist(!showCreatePlaylist);
                        toggleMainContentScroll(true);
                        setForceUpdate(true);
                    }} />
                )
            }
        </div>
    );
}

export default YourPlaylistsPage;