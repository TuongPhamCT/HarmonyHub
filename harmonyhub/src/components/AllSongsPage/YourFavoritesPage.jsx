//import { useParams } from 'react-router';
import '../../components/Global.css';
import './AllSongsPage.css';
import Footer from '../MainPage/Footer';
import { sBoxAlts, sComponents } from '../SmallComponents/componentStore';
import { MusicBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { useEffect, useState } from 'react';
import { handleOnClickSong } from '../../services/itemOnClickService';
import { createDemoSongs } from '../../services/demoDataService';

const YourFavoritesPage = () => {
    const [songs, setSongs] = useState([]);

    const handleRemoveSongFromFavorite = async (data) => {
        // call api

    }

    useEffect(() => {
        // call api to get data
        const dataSongs = createDemoSongs();

        setSongs(
            dataSongs.map(
                (item) => (
                    <MusicBox
                        key={item.id}
                        title={item.name}
                        subtitle={item.artist}
                        data={item}
                        boxAlt={sBoxAlts.value.musicBoxInFavorites}
                        onClick={() => handleOnClickSong(item)}
                        onRemove={async () => {
                            setSongs((prev) => prev.filter((sSong) => item.id !== sSong.props.data.id));
                            await handleRemoveSongFromFavorite(item);
                        }}
                    ></MusicBox>
                )
            )
        );

    }, []);

    return (
        <div id="all-songs-page">
            <ItemCollectionVertical
                itemList={songs}
                title={"Your"}
                titleHighlight={"Favorites"}
                columnWidth={sComponents.value.musicBoxWidth}
            ></ItemCollectionVertical>
            <Footer/>
        </div>
    );
}

export default YourFavoritesPage;