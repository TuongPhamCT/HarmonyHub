import React, { useState } from 'react';
import '../../components/Global.css';
import Footer from '../MainPage/Footer';
import './AddSong.css';

const AddSongPage = () => {
    const [lyrics, setLyrics] = useState('');

    const handleLyricsChange = (event) => {
        setLyrics(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    return (
        <div className="addsongpage">
            <br />
            <br />
            <br />
            <br />
            <div className="header">
                <label className="gradient-label">ADD A NEW SONG</label>
            </div>
            <div className="content">
                <div className="image-upload">
                    <label htmlFor="image-input" className="image-box">
                        <input type="file" accept="image/*" id="image-input" hidden />
                        <span>Upload Image</span>
                    </label>
                    <div className="audio-box">
                        <input type="file" accept="audio/*" id="audio-input" hidden />
                        <label htmlFor="audio-input">Upload Audio</label>
                    </div>
                </div>
                <div className="info-fields">
                    <input type="text" placeholder="Song Name" />
                    <input type="text" placeholder="Author" />
                    <input type="text" placeholder="Albums" />
                    <input type="text" placeholder="Duration" />
                    <textarea
                        placeholder="Lyrics"
                        value={lyrics}
                        onChange={handleLyricsChange}
                        rows="3"
                    ></textarea>
                    <textarea placeholder="Description"></textarea>
                </div>
                <button className="upload-button">Upload</button>
            </div>
            <Footer />
        </div>
    );
};

export default AddSongPage;
