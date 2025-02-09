import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AlbumService } from '../../services/apiCall/album';
import { ArtistService } from '../../services/apiCall/artist';
import { GenreService } from '../../services/apiCall/genre';
import { SongService } from '../../services/apiCall/song';
import { shuffleArray } from '../../services/arrayService';
import { handleOnClickAlbum, handleOnClickArtist, handleOnClickGenre, handleOnClickPlaylist, handleOnClickSong } from '../../services/itemOnClickService';
import { navigateToAllPlaylists, navigateToNewReleaseSongs, navigateToTopAlbums } from '../../services/navigateService';
import Footer from '../MainPage/Footer';
import { AlbumBox, ArtistBox, GenreBox, MusicBox, PlaylistBox } from '../SmallComponents/ItemBox';
import ItemCollection from '../SmallComponents/ItemCollection';
import './DiscoverPage.css';

const DiscoverPage = () => {
    const nav = useNavigate();

    const [genres, setGenres] = useState();
    const [newReleaseSongData, setNewReleaseSongsData] = useState();
    const [topAlbumsData, setTopAlbumsData] = useState();
    const [moodPlaylists, setMoodPlaylists] = useState();
    const [popularArtists, setPopularArtists] = useState();
    const [newReleaseSongs, setNewReleaseSongs] = useState();
    const [topAlbums, setTopAlbums] = useState();

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            // call api to get data
            const fullDataSongs = await SongService.getSongs({
                sortBy: "createdAt",
                order: "desc",
                limit: 50,
            }) || [];
            setNewReleaseSongsData(
                fullDataSongs
            );
            const dataSongs = fullDataSongs.length > 6 ? fullDataSongs.slice(0, 6) : fullDataSongs;

            const fullDataAlbums = await AlbumService.getAlbums({
                limit: 50
            }) || [];
            setTopAlbumsData(fullDataAlbums);
            const dataAlbums = fullDataAlbums.length > 6 ? fullDataAlbums.slice(0, 6) : fullDataAlbums;
            const dataPlaylists = [];
            let dataArtists = await ArtistService.getArtists({
            }) || [];
            dataArtists = dataArtists.length > 6 ? shuffleArray(dataArtists).slice(0, 6) : dataArtists;
            let dataGenres = await GenreService.getGenres({
                sortBy: "name",
                order: "asc",
            }) || [];
            dataGenres = dataGenres.length > 6 ? shuffleArray(dataGenres).slice(0, 6) : dataGenres;

            setGenres(
                dataGenres.map(
                    (item) => (
                        <GenreBox
                            key={item.id}
                            title={item.name}
                            onClick={() => handleOnClickGenre(nav, item.id, item.name)}
                        ></GenreBox>
                    )
                )
            );

            setMoodPlaylists(
                dataPlaylists.map(
                    (item) => (
                        <PlaylistBox
                            key={item.id}
                            title={item.title}
                            onClick={() => handleOnClickPlaylist(nav, item.id)}
                        />
                    )
                )
            );

            setPopularArtists(
                dataArtists.map(
                    (item) => (
                        <ArtistBox
                            key={item.id}
                            title={item.name}
                            onClick={() => handleOnClickArtist(nav, item.id)}
                        ></ArtistBox>
                    )
                )
            );

            setTopAlbums(
                dataAlbums.map(
                    (item) => (
                        <AlbumBox
                            key={item.id}
                            title={item.title}
                            subtitle={item.description}
                            onClick={() => handleOnClickAlbum(nav, item.id)}
                        ></AlbumBox>
                    )
                )
            );

            setNewReleaseSongs(
                dataSongs.map(
                    (item) => (
                        <MusicBox
                            key={item.id}
                            title={item.name}
                            subtitle={item.artist}
                            onClick={() => handleOnClickSong(item)}
                        ></MusicBox>
                    )
                )
            );
        }

        fetchData();
        return () => {
            controller.abort(); // Cleanup function: hủy request khi component unmount
        };

    }, [nav]);

    // const videoCollection = demoListVideo.map(
    //     (item, index) => (
    //         <MvBox key={"mv-col" + item} title={"video" + item} subtitle="random subtitle" view={index + "M views"}></MvBox>       
    //     )
    // )

    return (

        <div className="discover-page">
            <br />
            <br />
            <ItemCollection
                itemList={genres}
                title="Music"
                titleHighlight="Genres"
                onViewAll={() => { nav('/genres') }}
            ></ItemCollection>
            <ItemCollection
                itemList={moodPlaylists}
                title="Mood"
                titleHighlight="Playlist"
                onViewAll={() => { navigateToAllPlaylists(nav, "Mood", "Playlists", "mood-playlists") }}
            ></ItemCollection>
            <ItemCollection
                itemList={popularArtists}
                title="Popular"
                titleHighlight="Artists"
                onViewAll={() => { nav('/artist') }}
            ></ItemCollection>
            {/* <MvCollection itemList={videoCollection} title="Trending" titleHighlight="Video"></MvCollection> */}
            <ItemCollection
                itemList={newReleaseSongs}
                title="New Release"
                titleHighlight="Songs"
                onViewAll={() => { navigateToNewReleaseSongs(nav, newReleaseSongData) }}
            ></ItemCollection>
            <ItemCollection
                itemList={topAlbums}
                title="Top"
                titleHighlight="Albums"
                onViewAll={() => { navigateToTopAlbums(nav, topAlbumsData) }}
            ></ItemCollection>
            <Footer />
        </div>
    );
}

export default DiscoverPage;