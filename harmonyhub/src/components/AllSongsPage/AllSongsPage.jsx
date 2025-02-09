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

const AllSongsPage = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        // call api to get data
        const dataSongs = sSongs.value.songs;

        setSongs(
            dataSongs.map(
                (item) => (
                    <MusicBox
                        key={item.id}
                        title={item.name}
                        subtitle={item.artist}
                        image={item.image}
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