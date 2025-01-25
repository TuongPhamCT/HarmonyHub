import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import UserPlaylist from './UserPlaylist.json'

function YourPlaylist(props) {
    const navigate = useNavigate()
    const [playlistView] = useState(UserPlaylist)
    const [selectedId, setSelectedId] = useState(null)
    const [moreOption, setMoreOption] = useState(false)

    const handleMore = (id) => {
        setSelectedId(id)
        setMoreOption(prev => !prev)
    }

    const viewPlaylistDetail = (id) => {
        navigate(`/yourplaylist/${id}`)
    }

    const handleEdit = (id) => {
        console.log('Edit', id)
    }

    const handleDelete = (id) => {
        console.log('Delete', id)
    }

    const playlistViewElements = playlistView.map(playlist => (
        <div className='bg-[#f0f] w-fit'>
            <img
                className='w-48 h-48'
                src={props.imageUrl} alt='playlistimage'
                onClick={() => viewPlaylistDetail(playlist.id)}
            />
            <div className='flex justify-between items-center mt-2 relative'>
                <div>
                    <p className='text-white text-base'>Love</p>
                    <p className='text-[#5E5967] text-sm'>Justin Bieber</p>
                </div>
                <div className="relative"></div>
                <svg onClick={() => handleMore(playlist.id)} xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 cursor-pointer' fill="#fff" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>
                {moreOption && playlist.id === selectedId && (
                    <div className="absolute right-0 mt-2 w-fit rounded-md shadow-lg bg-gray-400 text-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                            <button onClick={() => handleEdit(playlist.id)} className="block px-4 py-2 text-sm hover:bg-gray-700 w-full text-left">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(playlist.id)} className="block px-4 py-2 text-sm hover:bg-gray-700 w-full text-left">
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    ))

    return (
        <div className='h-full mt-[8vh] mx-9'>
            <h1 className='text-4xl font-bold indent-5 mb-5'>Your Playlist</h1>
            <div className='grid grid-cols-4 gap-5'>
                {playlistViewElements}
            </div>
        </div>
    );
}

export default YourPlaylist;