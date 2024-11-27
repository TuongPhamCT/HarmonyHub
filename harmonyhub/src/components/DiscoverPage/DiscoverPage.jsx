
import './DiscoverPage.css';
import { AlbumBox, ArtistBox, GenreBox, MusicBox, MvBox, PlaylistBox } from '../SmallComponents/ItemBox';
import ItemCollection, { MvCollection } from '../SmallComponents/ItemCollection';
import Footer from '../MainPage/Footer';


const demoList = [
    "1", "2", "3", "4", "5"
];

const demoListArtist = [
    "1", "2", "3", "4"
];
const demoListVideo = [
    "1", "2", "3", "4", "5", "6"
];

const DiscoverPage = () => {
    const genreCollection = demoListArtist.map(
        (item, index) => (
            <GenreBox key={"gr-col" + index} title={"genre " + item}/>           
        )
    )

    const playlistCollection = demoList.map(
        (item, index) => (
            <PlaylistBox key={"pl-col" + index} title={"playlist " + index}/>           
        )
    )
    
    const artistCollection = demoList.map(
        (item, index) => (
            <ArtistBox key={"art-col" + index} title={"artist " + index}></ArtistBox>           
        )
    )

    const videoCollection = demoListVideo.map(
        (item, index) => (
            <MvBox key={"mv-col" + item} title={"video" + item} subtitle="random subtitle" view={index + "M views"}></MvBox>       
        )
    )

    const albumCollection = demoList.map(
        (item) => (
            <AlbumBox key={"al-col" + item} title={"album " + item} subtitle="random subtitle"></AlbumBox>           
        )
    )

    const songCollection = demoList.map(
        (item, index) => (
            <MusicBox key={"m-col" + index} title={item} subtitle="random subtitle"></MusicBox>           
        )
    )

    return (
        
        <div className="discover-page">
            <br/>
            <br/>
            <ItemCollection itemList={genreCollection} title="Music" titleHighlight="Genres"></ItemCollection>
            <ItemCollection itemList={playlistCollection} title="Mood" titleHighlight="Playlist"></ItemCollection>
            <ItemCollection itemList={artistCollection} title="Popular" titleHighlight="Artists"></ItemCollection>
            <MvCollection itemList={videoCollection} title="Trending" titleHighlight="Video"></MvCollection>
            <ItemCollection itemList={songCollection} title="New Release" titleHighlight="Songs"></ItemCollection>
            <ItemCollection itemList={albumCollection} title="Top" titleHighlight="Albums"></ItemCollection>
            <Footer/>
        </div>
    );
}

export default DiscoverPage;