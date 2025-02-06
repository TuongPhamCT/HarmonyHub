import { useNavigate } from 'react-router';
import '../../components/Global.css';
import '../AlbumsPage/AlbumsPage.css';
import Footer from '../MainPage/Footer';
import { AlbumBox } from '../SmallComponents/ItemBox';
import ItemCollection from '../SmallComponents/ItemCollection';
import { navigateToNewReleaseAlbums, navigateToTopAlbums } from '../../services/navigateService';
import { useEffect, useState } from 'react';
import { createDemoAlbums } from '../../services/demoDataService';
import { handleOnClickAlbum } from '../../services/itemOnClickService';

const AlbumsPage = () => {
    const nav = useNavigate();

    const [newReleaseAlbums, setNewReleaseAlbums] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);

    useEffect(() => {
        const dataAlbums = createDemoAlbums();

        setNewReleaseAlbums(
            dataAlbums.map(
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
            dataAlbums.map(
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

    }, [nav]);

    const handleNewReleaseViewAll = () => {
        navigateToNewReleaseAlbums(nav);
    }

    const handleTopAlbumsViewAll = () => {
        navigateToTopAlbums(nav);
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