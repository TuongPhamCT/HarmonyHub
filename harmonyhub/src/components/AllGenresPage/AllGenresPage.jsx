//import { useParams } from 'react-router';
import '../../components/Global.css';
import './AllGenresPage.css';
import Footer from '../MainPage/Footer';
import { sBoxAlts, sComponents } from '../SmallComponents/componentStore';
import { GenreBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { useCallback, useEffect, useState } from 'react';
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

    const handleRemoveGenre = useCallback((id) => {
        setGenres((prev) => prev.filter((i) => id !== i.props.data.id));
    }, []);

    const handleUpdateGenre = useCallback((item, oldItem) => {
        const newGenre = 
            <GenreBox
                key={item.id}
                title={item.name}
                data={item}
                image={item.image}
                boxAlt={sBoxAlts.value.genreBoxEditable}
                onClick={() => handleOnClickGenre(nav, item.id, item.name)}
                onUpdate={(newItem) => handleUpdateGenre(newItem, item)}
                onRemove={() => handleRemoveGenre(item.id)}
            ></GenreBox>   

        setGenres((prev) => {
            const newArray = [...prev]; // Sao chép mảng
            let targetIndex = 0;
            newArray.forEach((i, index) => {
                if (i.props.data.id === oldItem.id) {
                    targetIndex = index;
                }
            });
            newArray[targetIndex] = newGenre;
            return newArray; // Trả về mảng mới để cập nhật state
        });

    }, [nav, handleRemoveGenre]);

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
                        onUpdate={(newItem) => handleUpdateGenre(newItem, item)}
                        onRemove={() => handleRemoveGenre(item.id)}
                    ></GenreBox>           
                )
            )
        );
    }, [nav, handleRemoveGenre, handleUpdateGenre]);

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