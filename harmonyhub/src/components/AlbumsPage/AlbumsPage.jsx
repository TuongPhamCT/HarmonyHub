import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../../components/Global.css';
import { AlbumService } from '../../services/apiCall/album';
import { handleOnClickAlbum } from '../../services/itemOnClickService';
import { navigateToNewReleaseAlbums, navigateToTopAlbums } from '../../services/navigateService';
import '../AlbumsPage/AlbumsPage.css';
import Footer from '../MainPage/Footer';
import { AlbumBox } from '../SmallComponents/ItemBox';
import ItemCollection from '../SmallComponents/ItemCollection';
import { loadPreviewNewReleaseAlbums, loadPreviewTopAlbums } from './services/albumServices';
import { loadAllNewReleaseAlbums, loadAllTopAlbums } from './services/allAlbumServices';

const AlbumsPage = () => {
    const nav = useNavigate();

    const [newReleaseAlbums, setNewReleaseAlbums] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            const dataAlbums = await AlbumService.getAlbums({
                limit: 50
            }).albums || [];
            setAlbumsData(dataAlbums);

            setNewReleaseAlbums(
                loadPreviewNewReleaseAlbums(dataAlbums).map(
                    (item) => (
                        <AlbumBox
                            key={item.id}
                            title={item.title}
                            subtitle={item.description}
                            onClick={() => handleOnClickAlbum(nav, item.id)}
                        ></AlbumBox>
                    )
                )
            );

            setTopAlbums(
                loadPreviewTopAlbums(dataAlbums).map(
                    (item) => (
                        <AlbumBox
                            key={item.id}
                            title={item.title}
                            subtitle={item.description}
                            onClick={() => handleOnClickAlbum(nav, item.id)}
                        ></AlbumBox>
                    )
                )
            );
        }

        fetchData();
        return () => {
            controller.abort(); // Cleanup function: hủy request khi component unmount
        };
    }, [nav]);

    const handleNewReleaseViewAll = () => {
        navigateToNewReleaseAlbums(nav, loadAllNewReleaseAlbums(albumsData));
    }

    const handleTopAlbumsViewAll = () => {
        navigateToTopAlbums(nav, loadAllTopAlbums(albumsData));
    }

    return (
        <div id="albums-page">
            <ItemCollection
                itemList={newReleaseAlbums}
                title="New Release"
                titleHighlight="Albums"
                onViewAll={handleNewReleaseViewAll}
            ></ItemCollection>
            <ItemCollection
                itemList={topAlbums}
                title="Top"
                titleHighlight="Albums"
                onViewAll={handleTopAlbumsViewAll}
            ></ItemCollection>
            <Footer />
        </div>
    );
}

export default AlbumsPage;