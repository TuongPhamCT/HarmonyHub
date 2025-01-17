import { useNavigate } from 'react-router';
import '../../components/Global.css';
import '../AlbumsPage/AlbumsPage.css';
import Footer from '../MainPage/Footer';
import { AlbumBox } from '../SmallComponents/ItemBox';
import ItemCollection from '../SmallComponents/ItemCollection';
import { sAlbums } from './albumStore';

const demoList = [
    "song1", "song2", "song3", "song4", "song5"
]

const AlbumsPage = () => {
    const nav = useNavigate();

    const collection = demoList.map(
        (item, index) => (
            <AlbumBox
                key={"album" + index}
                title={item}
                subtitle="random subtitle"
            />
        )
    )

    const handleNewReleaseViewAll = () => {
        sAlbums.set((v) => v.value.title = "New Release");
        sAlbums.set((v) => v.value.titleHighlight = "Albums");
        nav('/albums/new-release-albums');
    }

    const handleTopAlbumsViewAll = () => {
        sAlbums.set((v) => v.value.title = "Top");
        sAlbums.set((v) => v.value.titleHighlight = "Albums");
        nav('/albums/top-albums');
    }

    return (
        <div id="albums-page">
            <ItemCollection
                itemList={collection}
                title="New Release"
                titleHighlight="Albums"
                onViewAll={handleNewReleaseViewAll}
            ></ItemCollection>
            <ItemCollection
                itemList={collection}
                title="Top"
                titleHighlight="Albums"
                onViewAll={handleTopAlbumsViewAll}
            ></ItemCollection>
            <Footer />
        </div>
    );
}

export default AlbumsPage;