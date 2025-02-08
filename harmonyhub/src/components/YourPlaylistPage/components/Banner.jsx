import React from 'react'
import playlistImg from '../../../assets/img/playlist_img.png'


const Banner = () => {
    return (
        <div className='px-5 flex flex-col bg-[#1472DE] h-[400px]'>
            <div className='flex items-end justify-between'>
                <div className='flex gap-10 w-3/4'>
                    <img src={playlistImg} alt='playlist_img' />
                    <div className='flex flex-col justify-between py-5'>
                        <h1 className='text-2xl font-bold'>Trending Song Mix</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam leo at massa tempus, viverra.</p>
                        <div className='flex items-center gap-2'>
                            <p>20 songs</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8' fill='#f0f' viewBox="0 0 16 16">
                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                            </svg>
                            <p>1h  20min</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-4 py-5'>
                    <h3 className='text-[#f0f] font-bold text-xl'>Play All</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className='w-10 h-10' fill='#f0f' viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Banner