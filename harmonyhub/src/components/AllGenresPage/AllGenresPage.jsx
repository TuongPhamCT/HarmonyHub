//import { useParams } from 'react-router';
import '../../components/Global.css';
import './AllGenresPage.css';
import Footer from '../MainPage/Footer';
import { sComponents } from '../SmallComponents/componentStore';
import { GenreBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { useEffect, useState } from 'react';
import { handleOnClickGenre } from '../../services/itemOnClickService';
import { useNavigate } from 'react-router';

const demoList = [
    "song1", "song2", "song3", "song4", "song5", "song6", "song7", "song8"
]

const AllGenresPage = () => {
    const nav = useNavigate();
    const [genres, setGenres] = useState([]);


    useEffect(() => {
        setGenres(
            demoList.map(
                (item, index) => (
                    <GenreBox
                        key={index}
                        title={item}
                        onClick={() => handleOnClickGenre(nav, item, item)}
                    ></GenreBox>           
                )
            )
        );
    }, [nav]);

    return (
        <div id="all-genres-page">
            <ItemCollectionVertical
                itemList={genres}
                title={"All Song"}
                titleHighlight={"Genres"}
                columnWidth={sComponents.value.genreBoxWidth}
            ></ItemCollectionVertical>
            <Footer/>
        </div>
    );
}

export default AllGenresPage;