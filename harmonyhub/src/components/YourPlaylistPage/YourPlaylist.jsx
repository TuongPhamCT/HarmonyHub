import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Image1 from '../../assets/img/popular_song_image1.png'
import PlaylistPreview from './PlaylistPreview';
import UserPlaylist from './UserPlaylist.json'

function YourPlaylist(props) {
    const navigate = useNavigate()
    const [playlistView, setPlaylistView] = useState(UserPlaylist)

    const viewPlaylistDetail = (id) => {
        navigate(`/yourplaylist/${id}`)
    }

    const playlistViewElements = playlistView.map(playlist => (
        <PlaylistPreview
            key={playlist.id}
            id={playlist.id}
            imageUrl={playlist.imageUrl}
            name={playlist.name}
            author={playlist.author}
            click={() => viewPlaylistDetail(playlist.id)}
        />
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