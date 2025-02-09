import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { PlaylistService } from '../../../services/apiCall/playlist'
import axios from '../../../config/axios.js'

const PlaylistMusic = () => {
    const { id } = useParams()
    const [songs, setSongs] = useState([])
    // State to manage the current audio file
    const [audio] = useState(new Audio());

    // Function to play song
    const handleRowClick = (songFileUrl) => {
        // Set the audio source to the clicked song's file
        audio.src = songFileUrl;
        audio.play();
    };

    useEffect(() => {
        const getPlaylistSongs = async () => {
            const { data } = await axios.get(`/playlist/${id}/songs`)
            setSongs(data.songs)
        }
        getPlaylistSongs()
    }, [id])

    function formatDate(date) {
        const [year, month, day] = date.split('T')[0].split('-');
        return `${day}/${month}/${year}`;
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        if (seconds === 0) {
            seconds = '00';
        }
        return `${minutes}:${seconds}`;
    }
    function formatPublicUrl(relativePath) {
        const API_URL = 'http://localhost:5000';
        const cleanPath = relativePath.includes('images') ? relativePath.replace("/public/images", "/song_images") : relativePath.replace("/public/songs", "/songs");
        return `${API_URL}${cleanPath}`;
    };

    console.log(songs)

    return (
        <div className='bg-[linear-gradient(45deg,#144E92,#1D272D)] w-full'>
            <table className='mx-auto p-4 border-spacing-y-10 text-center border-separate border-none w-4/5'>
                <thead className='text-[#18191a] text-2xl'>
                    <tr>
                        <th className='text-center p-4 text-white'></th>
                        <th className='text-center p-4 w-60 text-white'>Image</th>
                        <th className='text-center p-4 w-60 text-white'>Realease Date</th>
                        <th className='text-center p-4 text-white'>Album</th>
                        <th className='text-center p-4 text-white'>Duration</th>
                        <th className='text-center p-4 text-white'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {songs && songs.map((song, index) => (
                        <tr key={song.id}
                            className="bg-[#1E1E1E] hover:bg-gray-700 transition-all duration-300 ease-in-out"
                            onClick={() => handleRowClick(formatPublicUrl(song.fileURL))} // Clicking the row plays the song
                        >
                            <td className="text-center px-4 font-bold text-3xl">{index + 1}</td>
                            <td className="text-left flex justify-start items-center">
                                <img className="w-16 h-16 mr-4 rounded" src={formatPublicUrl(song.image)} alt="" />
                                <div className="flex flex-col">
                                    <p className="text-left text-sm text-gray-500">{song.name}</p>
                                    <p className="text-left text-sm text-gray-500">{song.artist}</p>
                                </div>
                            </td>
                            <td className="text-center">{formatDate(song.createdAt)}</td>
                            <td className="text-center">{song.album}</td>
                            <td className="text-center">{formatTime(song.duration)}</td>
                            <td className="text-center px-4">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200 ease-in-out">
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                    {!songs && <tr><td colSpan="6" className="text-center text-gray-500 p-4">No songs</td></tr>}
                </tbody>
            </table>
        </div>

    )
}

export default PlaylistMusic