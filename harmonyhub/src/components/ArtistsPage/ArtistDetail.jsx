import React, { useEffect, useState } from 'react';
import ArtistsBanner from './components/ArtistsBanner';
// import PopularMusic from './components/PopularMusic'
// import ArtitstsAlbum from './components/ArtitstsAlbum';
// import SingleSong from './components/SingleSong';
// import ArtistsPlaylist from './components/ArtistsPlaylist';
// import AlsoListen from './components/AlsoListen';
import { useNavigate, useParams } from 'react-router';
import { ArtistService } from '../../services/apiCall/artist';
import { shuffleArray } from '../../services/arrayService';
import { formatDate } from '../../services/formatDateService';
import { handleOnClickAlbum, handleOnClickArtist, handleOnClickPlaylist, handleOnClickSong } from '../../services/itemOnClickService';
import { navigateToAllAlbums, navigateToAllPlaylists, navigateToAllSongs } from '../../services/navigateService';
import Footer from '../MainPage/Footer';
import { convertIntToTime } from '../MainPage/services/playbarServices';
import { sComponents } from '../SmallComponents/componentStore';
import { AlbumBox, ArtistBox, MusicBox, PlaylistBox } from '../SmallComponents/ItemBox';
import ItemCollection from '../SmallComponents/ItemCollection';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import MusicBar from '../SmallComponents/MusicBar';
import MusicCollection from '../SmallComponents/MusicCollection';

function ArtistDetailPage() {
    const nav = useNavigate();
    const { id } = useParams();

    const [artistName, setArtistName] = useState("");
    const [storedDataSongs, setStoredDataSongs] = useState([]);
    const [storedDataAlbums, setStoredDataAlbums] = useState([]);
    const [storedDataPlaylists, setStoredDataPlaylists] = useState([]);

    const [popularSongs, setPopularSongs] = useState([]);
    const [artistAlbums, setArtistAlbums] = useState([]);
    const [singleSongs, setSingleSongs] = useState([]);
    const [artistPlaylists, setArtistPlaylists] = useState([]);
    const [otherArtists, setOtherArtists] = useState([]);

    useEffect(() => {
        const controller = new AbortController(); 
        const fetchData =  async () => {
            const artist = await ArtistService.getArtistById(id);
            setArtistName(artist.name);

            // api call to get data
            const dataSongs = artist.popularSongs;
            setStoredDataSongs(dataSongs);
            let single = dataSongs.length > 6 ? shuffleArray(dataSongs).slice(0, 6) : dataSongs;
            let popular = dataSongs.sort((a, b) => b.playCount - a.playCount);
            popular = popular.length > 10 ? popular.slice(0, 10) : popular;
            let dataAlbums = artist.lastestAlbums;
            setStoredDataAlbums(dataAlbums);
            dataAlbums = dataAlbums.length > 6 ? dataAlbums.slice(0, 6) : dataAlbums;
            let dataPlaylists = artist.lastestPlaylists.filter((v) => v.isPublic);
            dataPlaylists = dataPlaylists.length > 6 ? dataPlaylists.slice(0, 6) : dataPlaylists;
            setStoredDataPlaylists(dataPlaylists);
            let dataArtists = await ArtistService.getArtists();
            dataArtists = dataArtists.length > 6 ? shuffleArray(dataArtists).slice(0, 6) : dataArtists; 

            setPopularSongs(
                popular.map(
                    (item, index) => (
                        <MusicBar
                            key={item.id}
                            headerWidth="10vh"
                            title={item.name}
                            subtitle={item.artist}
                            image={item.image}
                            header={"#" + (index + 1)}
                            data={item}
                            releaseDate={formatDate(item.createdAt)}
                            usePlayedCount={item.playCount}
                            time={convertIntToTime(item.duration)}
                            onClick={() => handleOnClickSong(nav, item.id)}
                        ></MusicBar>
                    )
                )
            );

            setArtistAlbums(
                dataAlbums.map(
                    (item) => (
                        <AlbumBox
                            key={item.id}
                            title={item.title}
                            subtitle={item.description}
                            image={item.image}
                            onClick={() => handleOnClickAlbum(nav, item.id)}
                        ></AlbumBox>
                    )
                )
            );     

            setSingleSongs(
                single.map(
                    (item) => (
                        <MusicBox
                            key={item.id}
                            title={item.name}
                            subtitle={item.artist}
                            image={item.image}
                            onClick={() => handleOnClickSong(item)}
                        ></MusicBox>
                    )
                )
            );

            setArtistPlaylists(
                dataPlaylists.map(
                    (item) => (
                        <PlaylistBox
                            key={item.id} 
                            title={item.title}
                            image={item.image}
                            onClick={() => handleOnClickPlaylist(nav, item.id, item.title, false)}
                        />
                    )
                )   
            );

            setOtherArtists(
                dataArtists.map(
                    (item) => (
                        <ArtistBox
                            key={item.id}
                            title={item.name}
                            image={item.image}
                            onClick={() => handleOnClickArtist(nav, item.id)}
                        ></ArtistBox>
                    )
                )
            );
        }

        fetchData();
        return () => {
            controller.abort(); // Cleanup function: hủy request khi component unmount
        };
    }, [nav, id]);

    const handleViewAllPopularSongs = () => {

    }

    return (
        <div className='h-full mt-[8vh] mx-9 flex flex-col gap-10 bg-black'>
            <ArtistsBanner name={artistName} />
            {/* <PopularMusic /> */}

            <MusicCollection
                musicList={popularSongs}
                title="Popular"
                titleHighlight="Musics"
                headerGap="10vh"
                usePlayedCount={true}
                disableViewAll={true}
                onViewAll={handleViewAllPopularSongs}
            ></MusicCollection>

            {/* <ArtitstsAlbum /> */}

            <ItemCollection
                itemList={artistAlbums}
                title={`${artistName}'s`}
                titleHighlight="Albums"
                onViewAll={() => {navigateToAllAlbums(nav, `${artistName}'s`, "Albums", "artist-albums", storedDataAlbums)}}
            ></ItemCollection>

            {/* <SingleSong /> */}

            <ItemCollection
                itemList={singleSongs}
                title="Single"
                titleHighlight="Songs"
                onViewAll={() => {navigateToAllSongs(nav, `${artistName}'s`, "Songs", "single-songs", storedDataSongs)}}
            ></ItemCollection>

            {/* <ArtistsPlaylist /> */}

            <ItemCollection
                itemList={artistPlaylists}
                title={`${artistName}'s`}
                titleHighlight="Playlists"
                onViewAll={() => {navigateToAllPlaylists(nav, `${artistName}'s`, "Playlists", "artist-playlists", storedDataPlaylists)}}
            ></ItemCollection>

            {/* <AlsoListen /> */}
            <ItemCollectionVertical
                itemList={otherArtists}
                title={`${artistName}'s Fans`}
                titleHighlight={"Also Listen To"}
                columnWidth={sComponents.value.artistBoxWidth}
            ></ItemCollectionVertical>
            <Footer/>
        </div>
    );
}

export default ArtistDetailPage;