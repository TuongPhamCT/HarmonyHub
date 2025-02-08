import React from 'react'
import { useState } from 'react'
import { PlaylistService } from '../../../services/apiCall/playlist';

const CreatePlaylist = ({ setIsCreate }) => {
    const [createData, setCreateData] = useState({
        title: '',
        isPublic: false
    });


    const handleCreate = (event) => {
        const { name, type, checked, value } = event.target;

        setCreateData(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const createPlaylist = async (e) => {
        e.preventDefault();
        try {
            await PlaylistService.createPlaylist(createData);
            setIsCreate(false);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <form className='w-4/5 max-w-[400px] absolute top-[20vh] left-[25vw] bg-gray-800 z-20 p-4'>
            <h2 className='text-center text-3xl font-bold text-violet-600'>Create New Playlist</h2>
            <section>
                <div className='my-5'>
                    <label htmlFor="title" className="text-yellow-500 mb-2 block">Title</label>
                    <input
                        className="w-full rounded-md p-[0.5rem] bg-gray-900 text-white"
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title of the playlist"
                        value={createData.title}
                        onChange={handleCreate}
                    />
                </div>
                <div>
                    <label htmlFor="sortBy" className="text-yellow-500 mr-2">Is Public</label>
                    <input
                        type="checkbox"
                        id="isPublic"
                        name="isPublic"
                        className="mr-2"
                        value={createData.isPublic}
                        onChange={handleCreate}
                    />
                </div>
            </section>
            <section className='mt-5 flex justify-end'>
                <button
                    onClick={() => setIsCreate(false)}
                    className="bg-gray-900 text-indigo-500 p-[0.5rem] w-full rounded-md mr-4"
                >
                    <span>Cancel</span>
                </button>
                <button
                    onClick={createPlaylist}
                    className="bg-gray-900 text-indigo-500 p-[0.5rem] w-full rounded-md"
                >
                    <span>Create Playlist</span>
                </button>

            </section>
        </form>
    )
}

export default CreatePlaylist