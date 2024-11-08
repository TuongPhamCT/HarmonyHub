import React, { useState } from 'react';
import Sidebar from '../MainPage/Sidebar';
import SearchBar from '../MainPage/SearchBar';
import ItemBox from '../SmallComponents/ItemBox';
import ItemCollection from '../SmallComponents/ItemCollection';
import VideoItemCollection from '../Discover/VideoItemCollection';
import Footer from '../MainPage/Footer';


const demoList = [
    "song1", "song2", "song3", "song4", "song5"
];
const demoList2 = [
    "song1", "song2", "song3", "song4"
];
const artist = [
    "artist1", "artist2", "artist3", "artist4", "artist5", "artist6",
];
const MainPage = () => {
    const collection = demoList2.map(
        (item, index) => (
            <ItemBox imageWidth="30vh" imageHeight="24vh" title={item} subtitle="random subtitle" view={index + "M views"} titleHighlight = "Genres"></ItemBox>           
        )
    )
    const collection2 = demoList.map(
        (item, index) => (
            <ItemBox imageWidth="24vh" imageHeight="24vh" title={item} subtitle="random subtitle" view={index + "M views"} titleHighlight = "Playlist"></ItemBox>           
        )
    )
    const artistCollection = artist.map(
        (item, index) => (
            <ItemBox imageWidth="20vh" imageHeight="20vh" title={item} titleHighlight = "Artists"></ItemBox>           
        )
    )

    const videoCollection = artist.map(
        (item, index) => (
            <ItemBox imageWidth="45vh" imageHeight="25vh" title={item} subtitle="random subtitle" view={index + "M views"} titleHighlight = "Video"></ItemBox>       
        )
    )

    const songCollection = demoList.map(
        (item, index) => (
            <ItemBox imageWidth="24vh" imageHeight="24vh" title={item} subtitle="random subtitle" titleHighlight = "Songs"></ItemBox>           
        )
    )

    const albumsCollection = demoList.map(
        (item, index) => (
            <ItemBox imageWidth="24vh" imageHeight="24vh" title={item} subtitle="random subtitle" titleHighlight = "Albums"></ItemBox>           
        )
    )
    
    const [sidebarToggle, setSidebarToggle] = useState(false);
    
    const updateSidebarToggle = (newState) => {
        setSidebarToggle(newState);
    }

    return (
        <div class="wrapper">
            <div class="mainpage_sidebar" style={{display: (sidebarToggle ? 'none' : 'flex' )}}>
                <Sidebar sidebarToggle={sidebarToggle} updateParent={updateSidebarToggle}></Sidebar>
            </div>
            <div class="mainpage_content_wrapper">
                <div class="mainpage_header">
                    <SearchBar sidebarToggle={sidebarToggle} updateParent={updateSidebarToggle} ></SearchBar>
                </div>
                <div class="mainpage_content">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <ItemCollection itemList={collection} title="Music" titleHighlight="Genres"></ItemCollection>
                    <ItemCollection itemList={collection2} title="Mood" titleHighlight="Playlist"></ItemCollection>
                    <ItemCollection itemList={artistCollection} title="Popular" titleHighlight="Artists"></ItemCollection>
                    <VideoItemCollection itemList={videoCollection} title="Trending" titleHighlight="Video"></VideoItemCollection>
                    <ItemCollection itemList={songCollection} title="New Release" titleHighlight="Songs"></ItemCollection>
                    <ItemCollection itemList={albumsCollection} title="Top" titleHighlight="Albums"></ItemCollection>
                    <Footer/>
                </div>
                
            </div>
            
        </div>
    );
}

export default MainPage;