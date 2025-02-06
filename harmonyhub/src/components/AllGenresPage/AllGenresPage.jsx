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
import { createDemoGenres } from '../../services/demoDataService';


const AllGenresPage = () => {
    const nav = useNavigate();
    const [genres, setGenres] = useState([]);


    useEffect(() => {
        // call api to get genres
        const dataGenres = createDemoGenres();

        setGenres(
            dataGenres.map(
                (item) => (
                    <GenreBox
                        key={item.id}
                        title={item.name}
                        onClick={() => handleOnClickGenre(nav, item.id, item.name)}
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