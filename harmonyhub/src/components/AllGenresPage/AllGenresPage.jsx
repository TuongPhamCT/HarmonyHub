//import { useParams } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../../components/Global.css';
import { GenreService } from '../../services/apiCall/genre';
import { handleOnClickGenre } from '../../services/itemOnClickService';
import { sUser } from '../../store';
import Footer from '../MainPage/Footer';
import { toggleMainContentScroll } from '../MainPage/services/contentAreaServices';
import { sBoxAlts, sComponents } from '../SmallComponents/componentStore';
import { GenreBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { TextButton } from '../SmallComponents/TextButton';
import './AllGenresPage.css';
import { CreateGenre } from './partials/CreateGenre';

const ssPrivilege = sUser.slice((n) => n.privilege);

const AllGenresPage = () => {
    const nav = useNavigate();
    const [genres, setGenres] = useState([]);
    const [showCreateGenre, SetShowCreateGenre] = useState(false);

    const handleRemoveGenre = useCallback(async (id) => {
        setGenres((prev) => prev.filter((i) => id !== i.props.data.id));
        await GenreService.deleteGenre(id);
    }, []);

    const handleUpdateGenre = useCallback(async (item, oldItem) => {
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

        await GenreService.updateGenre(
            item.id,
            {
                name: item.name,
                image: item.image,
            }
        );

    }, [nav, handleRemoveGenre]);

    useEffect(() => {
        // call api to get genres
        const controller = new AbortController(); 
        const fetchData =  async () => {
            const dataGenres = await GenreService.getGenres({
                sortBy: "name",
                order: "asc",
            }) || [];

            console.log(dataGenres);

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
        }
        fetchData();
        return () => {
            controller.abort(); // Cleanup function: hủy request khi component unmount
        };
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
                        window.location.reload();
                    }} />
                )
            }
        </div>
    );
}

export default AllGenresPage;