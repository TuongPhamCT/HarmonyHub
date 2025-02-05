import { useNavigate } from 'react-router';
import '../../components/Global.css';
import '../AlbumsPage/AlbumsPage.css';
import Footer from '../MainPage/Footer';
import { AlbumBox } from '../SmallComponents/ItemBox';
import ItemCollection from '../SmallComponents/ItemCollection';
import { navigateToNewReleaseAlbums, navigateToTopAlbums } from '../../services/navigateService';
import { useEffect, useState } from 'react';

const demoList = [
    "song1", "song2", "song3", "song4", "song5"
]

const AlbumsPage = () => {
    const nav = useNavigate();

    const [newReleaseAlbums, setNewReleaseAlbums] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);

    useEffect(() => {

        setNewReleaseAlbums(
            demoList.map(
                (item, index) => (
                    <AlbumBox
                        key={"album" + index}
                        title={item}
                        subtitle="random subtitle"
                        onClick={() => {handleOnClickAlbum(item)}}
                    />
                )
            )
        );

        setTopAlbums(
            demoList.map(
                (item, index) => (
                    <AlbumBox
                        key={"album" + index}
                        title={item}
                        subtitle="random subtitle"
                        onClick={() => {handleOnClickAlbum(item)}}
                    />
                )
            )
        );

    }, []);

    const handleOnClickAlbum = (albumId) => {
        //nav('/album/' + albumId)
    }

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