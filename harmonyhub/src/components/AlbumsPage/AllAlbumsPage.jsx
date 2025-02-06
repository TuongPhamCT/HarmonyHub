//import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import '../../components/Global.css';
import '../AlbumsPage/AllAlbumsPage.css';
import Footer from '../MainPage/Footer';
import { AlbumBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { sAlbums } from './albumStore';
import { handleOnClickAlbum } from '../../services/itemOnClickService';
import { useNavigate, useParams } from 'react-router';
import { createDemoAlbums } from '../../services/demoDataService';

const AllAlbumsPage = () => {
    const nav = useNavigate();
    const { id } = useParams();

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        // call api to get data
        const dataAlbums = createDemoAlbums();

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