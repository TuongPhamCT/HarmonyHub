//import { useParams } from 'react-router';
import '../../components/Global.css';
import './AllGenresPage.css';
import Footer from '../MainPage/Footer';
import { sBoxAlts, sComponents } from '../SmallComponents/componentStore';
import { GenreBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { useEffect, useState } from 'react';
import { handleOnClickGenre } from '../../services/itemOnClickService';
import { useNavigate } from 'react-router';
import { createDemoGenres } from '../../services/demoDataService';
import { TextButton } from '../SmallComponents/TextButton';
import { toggleMainContentScroll } from '../MainPage/services/contentAreaServices';
import { CreateGenre } from './partials/CreateGenre';
import { sUser } from '../../store';

const ssPrivilege = sUser.slice((n) => n.privilege);

const AllGenresPage = () => {
    const nav = useNavigate();
    const [genres, setGenres] = useState([]);
    const [showCreateGenre, SetShowCreateGenre] = useState(false);

    useEffect(() => {
        // call api to get genres
        const dataGenres = createDemoGenres();

        setGenres(
            dataGenres.map(
                (item) => (
                    <GenreBox
                        key={item.id}
                        title={item.name}
                        data={item}
                        image={item.image}
                        boxAlt={sBoxAlts.value.genreBoxEditable}
                        onClick={() => handleOnClickGenre(nav, item.id, item.name)}
                    ></GenreBox>           
                )
            )
        );
    }, [nav]);

    return (
        <div id="all-genres-page">
            <div id="all-genres-title-wrapper">
                <p id="all-genres-title">All Genres</p>
                {
                    ssPrivilege.value.includes(3) ?
                        <TextButton
                        text="Add new"
                        borderColor="#0E9EEF"
                        backgroundColor="#0E9EEF"
                        color="white"
                        width="18vh"
                        height="100%"
                        onClick={() => {
                            SetShowCreateGenre(true);
                            toggleMainContentScroll(false);
                        }}/>
                    : null
                }
            </div>
            <hr></hr>
            <ItemCollectionVertical
                itemList={genres}
                columnWidth={sComponents.value.genreBoxWidth}
            ></ItemCollectionVertical>
            <Footer/>

            {
                showCreateGenre && (
                    <CreateGenre onClose={() => {
                        SetShowCreateGenre(!showCreateGenre);
                        toggleMainContentScroll(true);
                    }} />
                )
            }
        </div>
    );
}

export default AllGenresPage;