import { useEffect, useState } from 'react';
import '../../components/Global.css';
import '../LibraryPage/LibraryPage.css';
import Footer from '../MainPage/Footer';
import { AlbumBox, MusicBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { TextButton } from '../SmallComponents/TextButton';
import { ToggleButton } from '../SmallComponents/ToggleButton';
import { sComponents } from '../SmallComponents/componentStore';
import { useNavigate } from 'react-router';
import { handleOnClickAlbum, handleOnClickSong } from '../../services/itemOnClickService';
import { createDemoAlbums, createDemoSongs } from '../../services/demoDataService';
// import { useEffect } from 'react';

const libraryTabs = [
    "Song",
    "Album",
    // "MV"
]

export default function LibraryPage() {
    const nav = useNavigate();
    const [tab, setTab] = useState("Song");

    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);

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

    useEffect(() => {
        // call api to get data
        const dataSongs = createDemoSongs();
        const dataAlbums = createDemoAlbums();

        setSongs(
            dataSongs.map(
                (item) => (
                    <MusicBox
                        key={item.id}
                        title={item.name}
                        subtitle={item.artist}
                        onClick={() => handleOnClickSong(item.id)}
                    ></MusicBox>
                )
            )
        );

        setAlbums(
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

    }, [nav]);

    // const videoCollection = demoList.map(
    //     (item, index) => (
    //         <MvBox key={"mv-col" + item} title={"video" + item} subtitle="random subtitle" view={index + "M views"}></MvBox>       
    //     )
    // )

    const tabComponents = {
        "Song": 
            <ItemCollectionVertical
                itemList={songs}
                title={"Song"}
                columnWidth={sComponents.value.musicBoxWidth}
            />,
        "Album": 
            <ItemCollectionVertical 
                itemList={albums}
                title={"Album"}
                columnWidth={sComponents.value.albumBoxWidth}
            />,
        // "MV":
        //     <ItemCollectionVertical
        //         itemList={videoCollection}
        //         title={"MV"}
        //         columnWidth={sComponents.value.mvBoxWidth}
        //     />,
    }

    const handleAddNew = () => {
        switch (tab) {
            case "Song":
                {
                    nav('/addsong');
                    break;
                }
            case "Album":
                {
                    // create component
                    break;
                }
            default:
                break;
        }
    }

    return (
        <div id="library-page">
            <p id="library-title">Library</p>
            <div id="library-tabs-wrapper">
                <div id="library-tabs-container">
                    {tabs}
                </div>
                <TextButton text="Add new" borderColor="#0E9EEF" backgroundColor="#0E9EEF"
                    color="white" width="18vh" height="100%" onClick={() => handleAddNew()}/>
            </div>
            <hr />
            {
                tabComponents[tab] || null
            }
            <Footer />
        </div>
    );
}
