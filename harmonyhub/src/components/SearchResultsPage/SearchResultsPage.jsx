import { useState } from 'react';
import '../../components/Global.css';
import '../LibraryPage/LibraryPage.css';
import Footer from '../MainPage/Footer';
import ItemBox, { AlbumBox, MvBox, PlaylistBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { ToggleButton } from '../SmallComponents/ToggleButton';
import { sComponents } from '../SmallComponents/componentStore';
// import { useEffect } from 'react';

const demoList = [
    "song1", "song2", "song3", "song4", "song5", "song6", "song7", "song8"
]

const searchTabs = [
    "Song",
    "Album",
    "Playlist",
    "MV"
]

export default function SearchResultsPage() {
    const [tab, setTab] = useState("Song");

    const handleTabClick = (tabName) => {
        setTab(tabName);
    }

    const tabs = searchTabs.map(
        (item) => (
            <ToggleButton key={"search-tab-" + item} text={item}
                activeColor="#EE10B0" color="white" width="24vh" height="100%"
                active={tab === item} onClick={() => handleTabClick(item)}/>
        )
    );

    const collection = demoList.map(
        (item, index) => (
            <ItemBox imageWidth="24vh" imageHeight="24vh" title={item} subtitle="random subtitle" view={index + "M views"}></ItemBox>
        )
    );

    const videoCollection = demoList.map(
        (item, index) => (
            <MvBox key={"mv-col" + item} title={"video" + item} subtitle="random subtitle" view={index + "M views"}></MvBox>       
        )
    )

    const playlistCollection = demoList.map(
        (item) => (
            <PlaylistBox key={"pl-col" + item} title={"playlist" + item}></PlaylistBox>       
        )
    )

    const albumCollection = demoList.map(
        (item) => (
            <AlbumBox key={"al-col" + item} title={"album " + item} subtitle="random subtitle"></AlbumBox>           
        )
    )

    const tabComponents = {
        "Song": 
            <ItemCollectionVertical
                itemList={collection}
                title={"Song"}
                columnWidth={sComponents.value.musicBoxWidth}
            />,
        "Album": 
            <ItemCollectionVertical 
                itemList={albumCollection}
                title={"Album"}
                columnWidth={sComponents.value.albumBoxWidth}
            />,
        "Playlist":
            <ItemCollectionVertical 
                itemList={playlistCollection}
                title={"Playlist"}
                columnWidth={sComponents.value.playlistBoxWidth}
            ></ItemCollectionVertical>,
        "MV":
            <ItemCollectionVertical
                itemList={videoCollection}
                title={"MV"}
                columnWidth={sComponents.value.mvBoxWidth}
            />,
    }

    return (
        <div id="search-page">
            <p id="search-title">Library</p>
            <div id="search-tabs-wrapper">
                <div id="search-tabs-container">
                    {tabs}
                </div>
            </div>
            <hr />
            {
                tabComponents[tab] || null
            }
            <Footer />
        </div>
    );
}
