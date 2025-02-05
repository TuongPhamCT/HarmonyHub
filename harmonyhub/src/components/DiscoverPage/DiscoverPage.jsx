import './DiscoverPage.css';
import { AlbumBox, ArtistBox, GenreBox, MusicBox, PlaylistBox } from '../SmallComponents/ItemBox';
import ItemCollection from '../SmallComponents/ItemCollection';
import Footer from '../MainPage/Footer';
import { navigateToAllPlaylists, navigateToNewReleaseSongs, navigateToTopAlbums } from '../../services/navigateService';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { handleOnClickAlbum, handleOnClickArtist, handleOnClickGenre, handleOnClickPlaylist, handleOnClickSong } from '../../services/itemOnClickService';


const demoList = [
    "1", "2", "3", "4", "5"
];

const demoListArtist = [
    "1", "2", "3", "4"
];
// const demoListVideo = [
//     "1", "2", "3", "4", "5", "6"
// ];

const DiscoverPage = () => {
    const nav = useNavigate();

    const [genres, setGenres] = useState();
    const [moodPlaylists, setMoodPlaylists] = useState();
    const [popularArtists, setPopularArtists] = useState();
    const [newReleaseSongs, setNewReleaseSongs] = useState();
    const [topAlbums, setTopAlbums] = useState();

    useEffect(() => {
        // call api to get data

        setGenres(
            demoListArtist.map(
                (item, index) => (
                    <GenreBox
                        key={"gr-col" + index}
                        title={"genre " + item}
                        onClick={() => handleOnClickGenre(nav, item, item)}
                    />           
                )
            )
        );

        setMoodPlaylists(
            demoList.map(
                (item, index) => (
                    <PlaylistBox
                        key={"pl-col" + index}
                        title={"playlist " + index}
                        onClick={() => handleOnClickPlaylist(nav, item)}
                    />           
                )
            )
        );

        setPopularArtists(
            demoList.map(
                (item, index) => (
                    <ArtistBox
                        key={"art-col" + index}
                        title={"artist " + index}
                        onClick={() => handleOnClickArtist(nav, item)}
                    ></ArtistBox>           
                )
            )
        );

        setTopAlbums(
            demoList.map(
                (item) => (
                    <AlbumBox
                        key={"al-col" + item}
                        title={"album " + item}
                        subtitle="random subtitle"
                        onClick={() => handleOnClickAlbum(nav, item)}
                    ></AlbumBox>           
                )
            )
        );

        setNewReleaseSongs(
            demoList.map(
                (item, index) => (
                    <MusicBox
                        key={"m-col" + index}
                        title={item}
                        subtitle="random subtitle"
                        onClick={() => handleOnClickSong(item)}
                    ></MusicBox>           
                )
            )
        );

    }, [nav]);

    // const videoCollection = demoListVideo.map(
    //     (item, index) => (
    //         <MvBox key={"mv-col" + item} title={"video" + item} subtitle="random subtitle" view={index + "M views"}></MvBox>       
    //     )
    // )

    return (
        
        <div className="discover-page">
            <br/>
            <br/>
            <ItemCollection
                itemList={genres}
                title="Music"
                titleHighlight="Genres"
                onViewAll={() => {nav('/genres')}}
            ></ItemCollection>
            <ItemCollection
                itemList={moodPlaylists}
                title="Mood"
                titleHighlight="Playlist"
                onViewAll={() => {navigateToAllPlaylists(nav, "Mood", "Playlists", "mood-playlists")}}
            ></ItemCollection>
            <ItemCollection
                itemList={popularArtists}
                title="Popular" 
                titleHighlight="Artists"
                onViewAll={() => {nav('/artist')}}
            ></ItemCollection>
            {/* <MvCollection itemList={videoCollection} title="Trending" titleHighlight="Video"></MvCollection> */}
            <ItemCollection
                itemList={newReleaseSongs}
                title="New Release"
                titleHighlight="Songs"
                onViewAll={() => {navigateToNewReleaseSongs(nav)}}
            ></ItemCollection>
            <ItemCollection
                itemList={topAlbums}
                title="Top"
                titleHighlight="Albums"
                onViewAll={() => {navigateToTopAlbums(nav)}}
            ></ItemCollection>
            <Footer/>
        </div>
    );
}

export default DiscoverPage;