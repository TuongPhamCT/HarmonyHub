import React, { useState } from 'react';
import Image1 from '../../assets/img/popular_song_image1.png'


function PlaylistPreview(props) {
    const [isHovered, setIsHovered] = useState(false)


    const imageStyles = {
        backgroundColor: isHovered ? 'black' : 'transparent',
        opacity: isHovered ? 0.4 : 1,
        zIndex: 2,
    }

    return (
        <div className='bg-[#4287f5] w-fit'>
            <img
                className='w-48 h-48'
                src={props.imageUrl} alt='playlistimage'
                onClick={() => props.click(props.id)}
                style={imageStyles}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />
            <p className='text-white text-base'>{props.name}</p>
            <p className='text-[#5E5967] text-sm'>{props.author}</p>
        </div>
    );
}

export default PlaylistPreview;