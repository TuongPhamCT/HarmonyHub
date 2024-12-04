import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image1 from '../../assets/img/popular_song_image1.png'
import Image2 from '../../assets/img/popular_song_image2.png'
import Image3 from '../../assets/img/popular_song_image3.png'
import Image4 from '../../assets/img/popular_song_image4.png'
import Image5 from '../../assets/img/popular_song_image5.png'
import FavoriteButton from './FavoriteButton';
import EditButton from './EditButton';

function PopularMusic(props) {
    const allSongs = [
        { "ID": 1, "Image": Image1, "Name": "Benzethonium Chloride", "Realease Date": "12/20/2012", "isFavorite": true, "Played": 8755698, "Time": "2:02" },
        { "ID": 2, "Image": Image2, "Name": "Calcium Acetate", "Realease Date": "7/22/2010", "isFavorite": false, "Played": 30993449, "Time": "2:00" },
        { "ID": 3, "Image": Image3, "Name": "OCTINOXATE and TITANIUM DIOXIDE", "Realease Date": "11/12/2001", "isFavorite": true, "Played": 77921793, "Time": "2:36" },
        { "ID": 4, "Image": Image4, "Name": "Methocarbamol", "Realease Date": "1/9/2013", "isFavorite": true, "Played": 7104042, "Time": "9:37" },
        { "ID": 5, "Image": Image5, "Name": "Benzethonium Chloride", "Realease Date": "3/18/1994", "isFavorite": true, "Played": 65359285, "Time": "8:05" },
        { "ID": 6, "Image": Image1, "Name": "Extra Song 1", "Realease Date": "4/15/2020", "isFavorite": false, "Played": 1234567, "Time": "3:45" },
        { "ID": 7, "Image": Image2, "Name": "Extra Song 2", "Realease Date": "5/20/2021", "isFavorite": false, "Played": 2345678, "Time": "4:15" },
        { "ID": 8, "Image": Image3, "Name": "Extra Song 3", "Realease Date": "6/25/2022", "isFavorite": false, "Played": 3456789, "Time": "3:30" },
    ];

    const [displayCount, setDisplayCount] = useState(5);
    const [data, setData] = useState(allSongs.slice(0, displayCount));

    const handleShowMore = () => {
        setShowMore(!showMore)
        if (!showMore) {
            setDisplayCount(allSongs.length);
            setData(allSongs);
        }
    };

    const [showMore, setShowMore] = useState(false)

    const toggleFavorite = (id) => {
        setData(prevSongs => {
            return prevSongs.map((song) => {
                return song.ID === id ? { ...song, isFavorite: !song.isFavorite } : song
            })
        })
    }

    return (
        <div>
            <h2 className='text-4xl font-bold indent-5'>Popular</h2>
            <div className="overflow-y-auto">
                <table className="w-full border-collapse border-none">
                    <thead className="sticky top-0 bg-transparent border-b border-[#ECF0F2] border-solid">
                        <tr>
                            <th className="text-transparent">ID</th>
                            <th className="text-transparent">Image</th>
                            <th className="text-transparent w-[200px]">Name</th>
                            <th className="p-2 text-white">Realease Date</th>
                            <th className="p-2 text-white">Played</th>
                            <th className="p-2 text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="mt-2">
                        {
                            data.map((table, index) => {
                                return (
                                    <tr key={index} className="bg-[#1E1E1E] hover:bg-gray-700 transition-colors">
                                        <td className='text-center align-middle mb-2'>{table.ID}</td>
                                        <td className='text-center align-middle w-16 h-16'>
                                            <img className="w-16 h-16" src={table.Image} alt={table.Name}></img>
                                        </td>
                                        <td className='w-[200px]'>{table.Name}</td>
                                        <td className='text-center align-middle'>{table['Realease Date']}</td>
                                        <td className='text-center align-middle'>{table.Played}</td>
                                        <td className='flex gap-6 justify-center items-center h-[66px]'>
                                            <FavoriteButton
                                                isFavorite={table.isFavorite}
                                                click={() => toggleFavorite(table.ID)}
                                            />
                                            <span className="text-white">{table.Time}</span>
                                            <EditButton />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleShowMore}
                        className="px-4 py-2 bg-[#EE10B0] text-white rounded hover:bg-gray-600 transition-colors" >
                        {showMore ? "Show less" : "Show more"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopularMusic;