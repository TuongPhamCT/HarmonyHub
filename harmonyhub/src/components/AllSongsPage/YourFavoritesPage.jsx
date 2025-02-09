//import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import '../../components/Global.css';
import { SongService } from '../../services/apiCall/song';
import { handleOnClickSong } from '../../services/itemOnClickService';
import Footer from '../MainPage/Footer';
import { sBoxAlts, sComponents } from '../SmallComponents/componentStore';
import { MusicBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import './AllSongsPage.css';
import { useFavorite } from '../Contexts/FavoriteContext';

const YourFavoritesPage = () => {
    const [songs, setSongs] = useState([]);
    const { favorites } = useFavorite();

    useEffect(() => {
        // call api to get data
        const controller = new AbortController(); 
        const fetchData =  async () => {
            const dataSongs = await SongService.getFavoriteSongs({}) || [];

            setSongs(
                dataSongs.map(
                    (item) => (
                        <MusicBox
                            key={item.id}
                            title={item.name}
                            subtitle={item.artist}
                            data={item}
                            image={item.image}
                            boxAlt={sBoxAlts.value.musicBoxInFavorites}
                            onClick={() => handleOnClickSong(item)}
                            onRemove={async () => {
                                setSongs((prev) => prev.filter((sSong) => item.id !== sSong.props.data.id));
                            }}
                        ></MusicBox>
                    )
                )
            );
        }

        fetchData();
        return () => {
            controller.abort(); // Cleanup function: hủy request khi component unmount
        };

    }, [favorites]);

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