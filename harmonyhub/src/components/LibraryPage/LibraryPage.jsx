import { Route, Routes, useLocation, useNavigate } from 'react-router';
import '../../components/Global.css'
import '../LibraryPage/LibraryPage.css'
import Footer from '../MainPage/Footer';
import ItemBox, { AlbumBox, MvBox } from '../SmallComponents/ItemBox';
import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { ToggleButton } from '../SmallComponents/ToggleButton';
import { TextButton } from '../SmallComponents/TextButton';
import { sComponents } from '../SmallComponents/componentStore';
// import { useEffect } from 'react';

const demoList = [
    "song1", "song2", "song3", "song4", "song5", "song6", "song7", "song8"
]

const libraryTabs = [
    { tabName: "Song", path: "/library/song" },
    { tabName: "Album", path: "/library/album" },
    { tabName: "MV", path: "/library/mv" }
]

export default function LibraryPage() {
    const nav = useNavigate();
    const location = useLocation();

    // useEffect(() => {

    // },[location]);

    const handleTabClick = (path) => {
        switch (path) {
            case '/library/song':
                nav('/library/song');
                break;
            case '/library/album':
                nav('/library/album');
                break;
            case '/library/mv':
                nav('/library/mv');
                break;
            default:
                return;
        }
    }

    const tabs = libraryTabs.map(
        (item) => (
            <ToggleButton key={"library-tab-" + item.tabName} text={item.tabName}
                activeColor="#EE10B0" color="white" width="24vh" height="100%"
                active={item.path === location.pathname} onClick={() => handleTabClick(item.path)}/>
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

    const albumCollection = demoList.map(
        (item) => (
            <AlbumBox key={"al-col" + item} title={"album " + item} subtitle="random subtitle"></AlbumBox>           
        )
    )

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
            <Routes>
                <Route
                    path='/song'
                    element={
                        <ItemCollectionVertical itemList={collection} title={"Song"}
                            columnWidth={sComponents.value.musicBoxWidth}></ItemCollectionVertical>
                    }
                />
                <Route
                    path='/album'
                    element={
                        <ItemCollectionVertical itemList={albumCollection} title={"Album"}
                            columnWidth={sComponents.value.albumBoxWidth}></ItemCollectionVertical>
                    }
                />
                <Route
                    path='/mv'
                    element={
                        <ItemCollectionVertical itemList={videoCollection} title={"MV"}
                            columnWidth={sComponents.value.mvBoxWidth}></ItemCollectionVertical>
                    }
                />
            </Routes>
            <Footer />
        </div>
    );
}
