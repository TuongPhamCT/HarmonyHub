import React, { useState } from 'react';

function PlaylistPreview(props) {

    return (
        <div className='bg-[#f0f] w-fit'>
            <img
                className='w-48 h-48'
                src={props.imageUrl} alt='playlistimage'
                onClick={() => props.onClick(props.id)}
            />
            <div className='flex justify-between items-center mt-2 relative'>
                <div>
                    <p className='text-white text-base'>{props.name}</p>
                    <p className='text-[#5E5967] text-sm'>{props.author}</p>
                </div>
                <div className="relative"></div>
                <svg onClick={() => props.handleMore(props.id)} xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 cursor-pointer' fill='#fff' viewBox="0 0 16 16"></svg>
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            </div>
        </div>
    );
}

export default PlaylistPreview;