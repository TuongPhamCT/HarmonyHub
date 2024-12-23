import { useState } from 'react';
import '../../components/Global.css';
import '../LibraryPage/LibraryPage.css';
import Footer from '../MainPage/Footer';
import ItemBox, { AlbumBox, MusicBox, MvBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { TextButton } from '../SmallComponents/TextButton';
import { ToggleButton } from '../SmallComponents/ToggleButton';
import { sComponents } from '../SmallComponents/componentStore';
// import { useEffect } from 'react';

const demoList = [
    "song1", "song2", "song3", "song4", "song5", "song6", "song7", "song8"
]

const libraryTabs = [
    "Song",
    "Album",
    "MV"
]

export default function LibraryPage() {
    const [tab, setTab] = useState("Song");

    const handleTabClick = (tabName) => {
        setTab(tabName);
    }

    const tabs = libraryTabs.map(
        (item) => (
            <ToggleButton key={"library-tab-" + item} text={item}
                activeColor="#EE10B0" color="white" width="24vh" height="100%"
                active={item === tab} onClick={() => handleTabClick(item)}/>
        )
    );

    const collection = demoList.map(
        (item, index) => (
            <MusicBox key={"ms-col" + item} imageWidth="24vh" imageHeight="24vh" title={item} subtitle="random subtitle" view={index + "M views"}></MusicBox>
        )
    );

    const videoCollection = demoList.map(
        (item, index) => (
            <MvBox key={"mv-col" + item} title={"video" + item} subtitle="random subtitle" view={index + "M views"}></MvBox>       
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
        "MV":
            <ItemCollectionVertical
                itemList={videoCollection}
                title={"MV"}
                columnWidth={sComponents.value.mvBoxWidth}
            />,
    }

    return (
        <div id="library-page">
            <p id="library-title">Library</p>
            <div id="library-tabs-wrapper">
                <div id="library-tabs-container">
                    {tabs}
                </div>
                <TextButton text="Add new" borderColor="#0E9EEF" backgroundColor="#0E9EEF"
                    color="white" width="18vh" height="100%"/>
            </div>
            <hr />
            {
                tabComponents[tab] || null
            }
            <Footer />
        </div>
    );
}
