import '../../components/Global.css'
import '../AlbumsPage/AlbumsPage.css'
import Footer from '../MainPage/Footer';
import ItemBox from '../SmallComponents/ItemBox';
import ItemCollection from '../SmallComponents/ItemCollection';

const demoList = [
    "song1", "song2", "song3", "song4", "song5"
]

const AlbumsPage = () => {
    const collection = demoList.map(
        (item, index) => (
            <ItemBox imageWidth="24vh" imageHeight="24vh" title={item} subtitle="random subtitle" view={index + "M views"}></ItemBox>           
        )
    )

    return (
        <div id="albums-page">
            <ItemCollection itemList={collection} title="New Release" titleHighlight="Albums"></ItemCollection>
            <ItemCollection itemList={collection} title="Top" titleHighlight="Albums"></ItemCollection>
            <Footer/>
        </div>
    );
}

export default AlbumsPage;