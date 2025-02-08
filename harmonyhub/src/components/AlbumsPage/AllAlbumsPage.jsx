//import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../../components/Global.css';
import { handleOnClickAlbum } from '../../services/itemOnClickService';
import '../AlbumsPage/AllAlbumsPage.css';
import Footer from '../MainPage/Footer';
import { AlbumBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { sAlbums } from './albumStore';

const AllAlbumsPage = () => {
    const nav = useNavigate();
    //const { id } = useParams();

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const dataAlbums = sAlbums.value.albums;

        setAlbums(
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

    return (
        <div id="all-albums-page">
            <ItemCollectionVertical
                itemList={albums}
                title={sAlbums.value.title}
                titleHighlight={sAlbums.value.titleHighlight}
                columnWidth="24vh"
            ></ItemCollectionVertical>
            <Footer/>
        </div>
    );
}

export default AllAlbumsPage;