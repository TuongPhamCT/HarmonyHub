
import './DiscoverPage.css';
import { AlbumBox, ArtistBox, GenreBox, MusicBox, MvBox, PlaylistBox } from '../SmallComponents/ItemBox';
import ItemCollection, { MvCollection } from '../SmallComponents/ItemCollection';
import Footer from '../MainPage/Footer';


const demoList = [
    "1", "2", "3", "4", "5", "6"
];

const DiscoverPage = () => {
    const genreCollection = demoList.map(
        (item, index) => (
            <GenreBox id={"gr-col" + index} title={"genre " + item}/>           
        )
    )

    const playlistCollection = demoList.map(
        (item, index) => (
            <PlaylistBox id={"pl-col" + index} title={"playlist " + index}/>           
        )
    )
    
    const artistCollection = demoList.map(
        (item, index) => (
            <ArtistBox id={"art-col" + index} title={"artist " + index}></ArtistBox>           
        )
    )

    const videoCollection = demoList.map(
        (item, index) => (
            <MvBox id={"mv-col" + item} title={"video" + item} subtitle="random subtitle" view={index + "M views"}></MvBox>       
        )
    )

    const albumCollection = demoList.map(
        (item) => (
            <AlbumBox id={"al-col" + item} title={"album " + item} subtitle="random subtitle"></AlbumBox>           
        )
    )

    const songCollection = demoList.map(
        (item, index) => (
            <MusicBox id={"m-col" + index} title={item} subtitle="random subtitle"></MusicBox>           
        )
    )

    return (
        <div class="discover-page">
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