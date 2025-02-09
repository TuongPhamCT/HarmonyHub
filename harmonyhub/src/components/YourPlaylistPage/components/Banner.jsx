import React, { useEffect, useState } from 'react'
import playlistImg_test from '../../../assets/img/playlist_img.png'
import { useParams } from 'react-router'
import { PlaylistService } from '../../../services/apiCall/playlist'
import axios from '../../../config/axios.js'

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds === 0) {
        seconds = '00';
    }
    return `${minutes}m${seconds}s`;
}

const Banner = () => {
    const { id } = useParams()

    const [numberOfSongs, setNumberOfSongs] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playlistImg, setPlaylistImg] = useState(playlistImg_test);
    const [playlistTitle, setPlaylistTitle] = useState('Playlist Title');
    const [isPublic, setIsPublic] = useState();

    useEffect(() => {
        const getPlaylistInfo = async () => {
            const { data } = await axios.get(`/playlist/${id}/songs`)

            setNumberOfSongs(data.songs.length);

            const duration = formatTime(data.songs.reduce((total, song) => total + song.duration, 0));
            setDuration(duration);

            const response = await axios.get(`/playlists`)
            const playlist = response.data.playlists.find(playlist => playlist.id === parseInt(id))
            setPlaylistTitle(playlist.title)
            setIsPublic(playlist.isPublic)
        }
        getPlaylistInfo()
    }, [id])

    let publicColor = 'text-red-500'
    if (isPublic) {
        publicColor = 'text-green-500'
    }

    return (
        <div className='flex flex-col bg-[#1472DE] h-[400px] rounded-lg'>
            <div className='flex items-end justify-between my-auto px-20'>
                <div className='flex gap-10 w-3/4'>
                    <img src={playlistImg} alt='playlist_img' />
                    <div className='flex flex-col justify-between py-5'>
                        <h1 className='text-2xl font-bold'>{playlistTitle}</h1>
                        <p className={`${publicColor} font-bold`}>
                            {isPublic ? 'Public' : 'Private'}
                        </p>
                        <div className='flex items-center gap-2'>
                            <p>{numberOfSongs} song</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8' fill='#f0f' viewBox="0 0 16 16">
                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                            </svg>
                            <p>{duration}</p>
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