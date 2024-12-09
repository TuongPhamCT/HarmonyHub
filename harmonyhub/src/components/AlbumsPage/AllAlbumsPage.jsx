//import { useParams } from 'react-router';
import '../../components/Global.css';
import '../AlbumsPage/AllAlbumsPage.css';
import Footer from '../MainPage/Footer';
import ItemBox from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { sAlbums } from './albumStore';

const demoList = [
    "song1", "song2", "song3", "song4", "song5", "song6", "song7", "song8"
]

const AllAlbumsPage = () => {

    const collection = demoList.map(
        (item, index) => (
            <ItemBox key={index} imageWidth="24vh" imageHeight="24vh" title={item} subtitle="random subtitle" view={index + "M views"}></ItemBox>           
        )
    )

    return (
        <div id="all-albums-page">
            <ItemCollectionVertical itemList={collection} title={sAlbums.value.title}
             titleHighlight={sAlbums.value.titleHighlight} columnWidth="24vh"></ItemCollectionVertical>
            <Footer/>
        </div>
    );
}

export default AllAlbumsPage;