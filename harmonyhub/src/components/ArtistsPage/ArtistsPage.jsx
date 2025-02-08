import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArtistService } from '../../services/apiCall/artist';
import { shuffleArray } from '../../services/arrayService';
import { handleOnClickArtist } from '../../services/itemOnClickService';
import Footer from '../MainPage/Footer';
import { ArtistBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { sComponents } from '../SmallComponents/componentStore';

function ArtistsPage() {

    const navigate = useNavigate();

    const [popularArtists, setPopularArtists] = useState([]);
    const [favoriteArtists, setFavoriteArtists] = useState([]);

    useEffect(() => {
        // Call api to get data
        const controller = new AbortController(); 
        const fetchData =  async () => {
            const dataArtists = await ArtistService.getArtists().artists || [];
            const popular = dataArtists.length > 20 ? shuffleArray(dataArtists).slice(0, 20) : dataArtists;
            const favorites = dataArtists.length > 20 ? shuffleArray(dataArtists).slice(0, 20) : dataArtists;

            setPopularArtists(
                popular.map(
                    (item) => (
                        <ArtistBox
                            key={item.id}
                            title={item.name}
                            onClick={() => handleOnClickArtist(navigate, item.id)}
                        ></ArtistBox>
                    )
                )
            );
    
            setFavoriteArtists(
                favorites.map(
                    (item) => (
                        <ArtistBox
                            key={item.id}
                            title={item.name}
                            onClick={() => handleOnClickArtist(navigate, item.id)}
                        ></ArtistBox>
                    )
                )
            );
        }

        fetchData();
        return () => {
            controller.abort(); // Cleanup function: hủy request khi component unmount
        };
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