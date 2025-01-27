import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function YourPlaylist(props) {
    const navigate = useNavigate();
    const [playlistView, setPlaylistView] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [moreOption, setMoreOption] = useState(false);

    // Fetch playlists on mount
    const fetchData = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const BearerToken = `Bearer ${accessToken}`;
            const { data } = await axios.get('/playlists', {
                headers: { Authorization: BearerToken },
            });
            setPlaylistView(data);
        } catch (error) {
            console.error('Error fetching playlist:', error);
        }
    };
    useEffect(() => {
        const fetchPlaylist = async () => {
            await fetchData();
        };
        fetchPlaylist();
    }, []);

    const handleMore = (id) => {
        setSelectedId(id);
        setMoreOption((prev) => !prev);
    };

    const viewPlaylistDetail = (id) => {
        navigate(`/yourplaylist/${id}`);
    };

    const handleEdit = (id) => {
        console.log('Edit', id);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this playlist?');
        if (!confirmDelete) return;
        try {
            const { data } = await axios.delete(`/playlist/${id}`);
            toast.success("Playlist deleted successfully!");
            await fetchData();
        } catch (error) {
            console.error('Error deleting playlist:', error);
            toast.error("Error deleting playlist!");
        }
    };

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (moreOption) {
                setMoreOption(false);
                setSelectedId(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [moreOption]);

    // Render playlist elements
    const playlistViewElements = playlistView.map((playlist) => (
        <div key={playlist.id} className="bg-transparent w-fit">
            <img
                className="w-48 h-48 object-cover rounded-lg"
                src={props.imageUrl || '/default-image.png'} // Fallback to default image if props.imageUrl is undefined
                alt="Playlist"
                onClick={() => viewPlaylistDetail(playlist.id)}
            />
            <div className="flex justify-between items-center mt-2 relative">
                <p className="text-white text-lg">{playlist.title}</p>
                <svg
                    onClick={(e) => {
                        e.stopPropagation();
                        handleMore(playlist.id);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                    />
                </svg>
                {moreOption && playlist.id === selectedId && (
                    <div className="absolute right-0 mt-2 w-fit rounded-md shadow-lg bg-[#3E3E3E] text-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(playlist.id);
                                }}
                                className="block px-4 py-2 text-sm hover:bg-gray-700 w-full text-left"
                            >
                                Edit
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(playlist.id);
                                }}
                                className="block px-4 py-2 text-sm hover:bg-gray-700 w-full text-left"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    ));

    return (
        <div className="h-full mt-[8vh] mx-9">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <h1 className="text-4xl font-bold indent-5 mb-5">Your Playlist</h1>
            <div className="grid grid-cols-4 gap-5">{playlistViewElements}</div>
        </div>
    );
}

export default YourPlaylist;
