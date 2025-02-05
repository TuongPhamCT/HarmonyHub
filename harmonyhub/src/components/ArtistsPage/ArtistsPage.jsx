import React, { useEffect, useState } from 'react';
import { ArtistBox } from '../SmallComponents/ItemBox';
import { useNavigate } from 'react-router';
import Footer from '../MainPage/Footer';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { sComponents } from '../SmallComponents/componentStore';
import { handleOnClickArtist } from '../../services/itemOnClickService';

const demoList = [
    "1", "2", "3", "4", "5", "6", "7", "8"
];

function ArtistsPage(props) {

    const navigate = useNavigate();

    const [popularArtists, setPopularArtists] = useState([]);
    const [favoriteArtists, setFavoriteArtists] = useState([]);

    useEffect(() => {
        // Call api to get data
        
        setPopularArtists(
            demoList.map(
                (item) => (
                    <ArtistBox
                        key={"al-col" + item}
                        title={"Artist name" + item}
                        subtitle="random subtitle"
                        onClick={() => handleOnClickArtist(navigate, item)}
                    >
                    </ArtistBox>
                )
            )
        );

        setFavoriteArtists(
            demoList.map(
                (item) => (
                    <ArtistBox
                        key={"al-col" + item}
                        title={"Artist name" + item}
                        subtitle="random subtitle"
                        onClick={() => handleOnClickArtist(navigate, item)}
                    >
                    </ArtistBox>
                )
            )
        );

    }, [navigate]);

    return (
        <div className='mt-[10vh] px-[4vh]'>
            <div>
                {/* <h1 className='text-3xl font-bold text-[#ee10b0] mb-[1em]'>Popular Artist</h1>
                <div className='grid grid-cols-4 gap-5'>
                    {artist}
                </div> */}
                <ItemCollectionVertical
                    itemList={popularArtists}
                    title="Popular"
                    titleHighlight="Artists"
                    columnWidth={sComponents.value.artistBoxWidth}
                ></ItemCollectionVertical>
            </div>
            <div>
                {/* <h1 className='text-3xl font-bold text-[#ee10b0] my-[1em]'>Favorite Artist</h1>
                <div className='grid grid-cols-4 gap-5'>
                    {artist}
                </div> */}
                <ItemCollectionVertical
                    itemList={favoriteArtists}
                    title="Favorite"
                    titleHighlight="Artists"
                    columnWidth={sComponents.value.artistBoxWidth}
                ></ItemCollectionVertical>
            </div>
            <Footer/>
        </div>
    );
}

export default ArtistsPage;