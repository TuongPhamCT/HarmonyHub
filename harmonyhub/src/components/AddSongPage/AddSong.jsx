import React, { useEffect, useRef, useState } from 'react';
import '../../components/Global.css';
import { GenreService } from '../../services/apiCall/genre';
import { SongService } from '../../services/apiCall/song';
import Footer from '../MainPage/Footer';
import { toggleMainContentScroll } from '../MainPage/services/contentAreaServices';
import './AddSong.css';
import { AddGenreToSong } from './components/AddGenreToSong';

const AddSongPage = () => {
    const [lyrics, setLyrics] = useState('');
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [genres, setGenres] = useState([]);
    const [allGenres, setAllGenres] = useState([]);
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const fileInputRef = useRef(null);
    const audioInputRef = useRef(null);


    // ======================================
    // initialize

        useEffect(() => {
            // call api to get genres
            const controller = new AbortController(); 
            const fetchData =  async () => {
                const dataGenres = await GenreService.getGenres({
                    sortBy: "name",
                    order: "asc",
                }) || [];
    
                setAllGenres(
                    dataGenres
                );
            }
            fetchData();
            return () => {
                controller.abort(); // Cleanup function: hủy request khi component unmount
            };
        }, []);

    // =======================================
    // genres dialog
    const [showGenreDialog, setShowGenreDialog] = useState(false);

    const handleLyricsChange = (event) => {
        setLyrics(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    const getGenresText = () => {
        let text = "";
        genres.forEach((i, index) => {
            if (index === 0) {
                text = text + i.name;
            } else {
                text = text + `, ${i.name}`;
            }
        });
        return text;
    }
    // =====================================

    // Image
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    // =====================================

    // Audio
    const handleAudioChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAudioFile(file);
            console.log("Selected audio:", file);
        }
    };
    // =====================================


    const handleUpload = async () => {
        // validating
        if (name.length === 0) {
            alert("Please enter the song name.");
            return;
        }
        if (author.length === 0) {
            alert("Please enter the author name.");
            return;
        }
        if (genres.length === 0) {
            alert("Please select at least one genre.");
            return;
        }
        if (audioFile === null) {
            alert("Please upload the audio file.");
            return;
        }

        await SongService.createSong({
            name: name,
            genres: genres.map((v) => v.id),
            file: audioFile,
            image: imageFile,
            lyric: lyrics,
            artist: author,
        });
    }

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
                    <div
                        className="image-box"
                        style={{
                            backgroundImage: image ? `url(${image})` : "none",
                        }}
                        onClick={() => fileInputRef.current.click()} 
                    >
                        {/* <input type="file" accept="image/*" id="image-input" hidden /> */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            id="image-input"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                            hidden
                        />
                        <span>{imageFile ? "" : "Upload Image"}</span>
                    </div>
                    <div
                        className="audio-box"
                        // onClick={() => audioInputRef.current.click()}
                    >
                        <input
                            type="file"
                            accept="audio/*"
                            id="audio-input"
                            hidden
                            ref={audioInputRef}
                            onChange={handleAudioChange}
                        />
                        <label
                            htmlFor="audio-input"
                            className='audio-box'
                            style={audioFile ? {backgroundColor: "rgba(147, 32, 55, 0.4)", width: "100%", height: "100%"} : {}}
                        >
                            {audioFile ? audioFile.name : "Upload Audio"}
                        </label>
                    </div>
                </div>
                <div className="info-fields">
                    <input
                        type="text"
                        placeholder="Song Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Genres"
                        readOnly
                        style={{cursor:"pointer"}}
                        value={getGenresText()}
                        onClick={() => {
                            setShowGenreDialog(true);
                            toggleMainContentScroll(false);
                        }}
                    />
                    {/* <input type="text" placeholder="Duration" /> */}
                    <textarea
                        placeholder="Lyrics"
                        value={lyrics}
                        onChange={(event) => handleLyricsChange(event)}
                        rows="3"
                    ></textarea>
                </div>
                <button className="upload-button" onClick={handleUpload}>Upload</button>
            </div>
            <Footer />
            
            {
                showGenreDialog && (
                    <AddGenreToSong
                        selectedGenres={genres}
                        allGenres={allGenres}
                        onClose={(newGenres) => {
                            setShowGenreDialog(!showGenreDialog);
                            toggleMainContentScroll(true);
                            setGenres(newGenres);
                        }}
                    />
                )
            }
        </div>
    );
};

export default AddSongPage;
