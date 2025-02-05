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

const demoList = [
    "song1", "song2", "song3", "song4", "song5", "song6", "song7", "song8"
]

const AllAlbumsPage = () => {
    const nav = useNavigate();
    const { id } = useParams();

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        // call api to get data

        setAlbums(
            demoList.map(
                (item, index) => (
                    <AlbumBox
                        key={index}
                        title={item} 
                        subtitle="random subtitle"
                        onClick={() => handleOnClickAlbum(nav, item)}
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