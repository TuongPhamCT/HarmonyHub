import { useLocation } from 'react-router';
import '../../components/Global.css'
import '../MostPlayedPage/MostPlayedPage.css'
import Footer from '../MainPage/Footer';
// import ItemBox, { AlbumBox, MvBox } from '../SmallComponents/ItemBox';
// import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { ToggleButton } from '../SmallComponents/ToggleButton';
// import { TextButton } from '../SmallComponents/TextButton';
// import { sComponents } from '../SmallComponents/componentStore';
import MusicBar from '../SmallComponents/MusicBar';
import MusicCollection from '../SmallComponents/MusicCollection';
import { useState } from 'react';
// import { useEffect } from 'react';

const demoList = [
    "song1", "song2", "song3", "song4", "song5", "song6", "song7", "song8"
]

const mostPlayedTabs = [
    { tabName: "Day", path: "day" },
    { tabName: "Week", path: "week" },
    { tabName: "Month", path: "month" }
]

export default function MostPlayedPage() {
    const [tab, setTab] = useState("day");
    // const nav = useNavigate();
    const location = useLocation();

    // useEffect(() => {

    // },[location]);

    const handleTabClick = (tabName) => {
        setTab(tabName);
        // switch (path) {
        //     case '/mostplayed/day':
        //         nav('/mostplayed/day');
        //         break;
        //     case '/mostplayed/week':
        //         nav('/mostplayed/week');
        //         break;
        //     case '/mostplayed/month':
        //         nav('/mostplayed/month');
        //         break;
        //     default:
        //         return;
        // }
    }

    const tabs = mostPlayedTabs.map(
        (item) => (
            <ToggleButton key={"mostplayed-tab-" + item.tabName} text={item.tabName}
                activeColor="#EE10B0" color="white" width="24vh" height="100%"
                active={item.path === tab} onClick={() => handleTabClick(item.path)}/>
        )
    );

    const musicCollection = demoList.map(
        (item, index) => (
            <MusicBar key={"mb" + index} headerWidth="10vh" title={item} subtitle="random subtitle" header={"#" + (index + 1)}
                releaseDate={"Nov " + (index + 1) + ", 2024"} album="Demo Album" time="2:00"></MusicBar>           
        )
    )

    const tabComponents = {
        "day": 
            <MusicCollection
                musicList={musicCollection} 
                title="Today Trending"
                titleHighlight="Songs"
                headerGap="10vh"
                disableViewAll={true}
            ></MusicCollection>,
        "week": 
            <MusicCollection
                musicList={musicCollection} 
                title="This Week Trending"
                titleHighlight="Songs"
                headerGap="10vh"
                disableViewAll={true}
            ></MusicCollection>,
        "month":
            <MusicCollection
                musicList={musicCollection} 
                title="This Month Trending"
                titleHighlight="Songs"
                headerGap="10vh"
                disableViewAll={true}
            ></MusicCollection>,
    }

    return (
        <div id="mostplayed-page">
            <p id="mostplayed-title">Most Played Songs</p>
            <div id="mostplayed-tabs-wrapper">
                <div id="mostplayed-tabs-container">
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
