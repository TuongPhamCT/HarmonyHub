import React from 'react';
import { AlbumBox, ArtistBox } from '../SmallComponents/ItemBox';
import { useNavigate } from 'react-router';
import Footer from '../MainPage/Footer';

function ArtistsPage(props) {
    const demoList = [
        "1", "2", "3", "4", "5", "6", "7", "8"
    ];

    const navigate = useNavigate();

    const artist = demoList.map(
        (item) => (
            <ArtistBox
                key={"al-col" + item}
                title={"Artist name" + item}
                subtitle="random subtitle"
                onClick={() => navigate('/artist/' + item)}
            >
            </ArtistBox>
        )
    )

    return (
        <div className='mt-[10vh] px-[4vh]'>
            <div>
                <h1 className='text-3xl font-bold text-[#ee10b0] mb-[1em]'>Popular Artist</h1>
                <div className='grid grid-cols-4 gap-5'>
                    {artist}
                </div>
            </div>
            <div>
                <h1 className='text-3xl font-bold text-[#ee10b0] my-[1em]'>Favorite Artist</h1>
                <div className='grid grid-cols-4 gap-5'>
                    {artist}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ArtistsPage;