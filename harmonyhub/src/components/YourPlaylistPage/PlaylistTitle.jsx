import React from 'react';
import { useParams } from 'react-router';

function PlaylistTitle(props) {
    const playlistDemo = [
        { "ID": playlistId, },
    ]
    const { playlistId } = useParams()

    return (
        <div className='bg-gradient-to-r from-[#1071E2] to-[#223844] w-full min-h-[400px] flex'>
            <img></img>
            <div></div>
            <div></div>
        </div>
    );
}

export default PlaylistTitle;