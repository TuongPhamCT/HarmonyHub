import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { PlaylistService } from '../../../services/apiCall/playlist'
import axios from '../../../config/axios.js'
import song_image from '../../../assets/img/popular_song_image2.png'

const PlaylistMusic = () => {
    const { id } = useParams()
    const [songs, setSongs] = useState([])

    useEffect(() => {
        const getPlaylistSongs = async () => {
            const { data } = await axios.get(`/playlist/${id}/songs`)
            setSongs(data.songs)
        }
        getPlaylistSongs()
    }, [id])

    console.log(songs)

    function formatDate(date) {
        const [year, month, day] = date.split('T')[0].split('-');
        return `${day}/${month}/${year}`;
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds}`;
    }

    return (
        <table className='max-w-[50rem] my-4 mx-auto p-4 border-spacing-10 text-center'>
            <thead className='text-[#990099] text-2xl'>
                <tr>
                    <th className='text-left p-4'>#</th>
                    <th className='text-left p-4 w-60'>Image</th>
                    <th className='text-left p-4 w-60'>Realease Date</th>
                    <th className='text-left p-4'>Album</th>
                    <th className='text-left p-4'>Duration</th>
                    <th className='text-left p-4'>Action</th>
                </tr>
            </thead>
            <tbody>
                {songs && songs.map((song, index) => (
                    <tr key={song.id}>
                        <td className='text-center'>{index + 1}</td>
                        <td className='text-left flex justify-start items-center'>
                            <img className='w-10 mr-4' src={song.image} alt='' />
                            <div className='flex flex-col'>
                                <p className='text-left text-sm text-gray-300'>{song.name}</p>
                                <p className='text-left text-sm text-gray-300'>Adele</p>
                            </div>
                        </td>
                        <td className='text-center'>{formatDate(song.createdAt)}</td>
                        <td className='text-center'>{song.album}</td>
                        <td className='text-center'>{formatTime(song.duration)}</td>
                        <td>
                            {/* <button>Favorite</button> */}
                            <button>Edit</button>
                        </td>
                    </tr>
                ))}
                {!songs && <tr><td colSpan='7'>No songs</td></tr>}
            </tbody>
        </table>
    )
}

export default PlaylistMusic