//import { useParams } from 'react-router';
import '../../components/Global.css';
import './AllSongsPage.css';
import Footer from '../MainPage/Footer';
import { sComponents } from '../SmallComponents/componentStore';
import { MusicBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { sSongs } from './songStore';
import { useEffect, useState } from 'react';
import { handleOnClickSong } from '../../services/itemOnClickService';

const demoList = [
    "song1", "song2", "song3", "song4", "song5", "song6", "song7", "song8"
]

const AllSongsPage = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        // call api to get data

        setSongs(
            demoList.map(
                (item, index) => (
                    <MusicBox
                        key={index}
                        title={item}
                        subtitle="random subtitle"
                        onClick={() => handleOnClickSong(item)}
                    ></MusicBox>           
                )
            )
        );

    }, []);

    return (
        <div id="all-songs-page">
            <ItemCollectionVertical
                itemList={songs}
                title={sSongs.value.title}
                titleHighlight={sSongs.value.titleHighlight}
                columnWidth={sComponents.value.musicBoxWidth}
            ></ItemCollectionVertical>
            <Footer/>
        </div>
    );
}

export default AllSongsPage;