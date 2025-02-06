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
import { useEffect, useState } from 'react';
import { createDemoSongs } from '../../services/demoDataService';
import { formatDate } from '../../services/formatDateService';
import { convertIntToTime } from '../MainPage/services/playbarServices';
import { handleOnClickSong } from '../../services/itemOnClickService';

const mostPlayedTabs = [
    { tabName: "Day", path: "day" },
    { tabName: "Week", path: "week" },
    { tabName: "Month", path: "month" }
]

export default function MostPlayedPage() {
    const [tab, setTab] = useState("day");

    const [daySongs, setDaySongs] = useState([]);
    const [weekSongs, setWeekSongs] = useState([]);
    const [monthSongs, setMonthSongs] = useState([]);

    const handleTabClick = (tabName) => {
        setTab(tabName);
    }

    useEffect(() => {
        // call API to get data
        const dataSongs = createDemoSongs();
    
        setDaySongs(
            dataSongs.map(
                (item, index) => (
                    <MusicBar
                        key={item.id}
                        headerWidth="10vh"
                        title={item.name}
                        subtitle={item.artist}
                        header={"#" + (index + 1)}
                        releaseDate={formatDate(item.releaseDate)}
                        usePlayedCount={item.playCount}
                        time={convertIntToTime(item.duration)}
                        onClick={() => handleOnClickSong(item.id)}
                    ></MusicBar>
                )
            )
        );

        setWeekSongs(
            dataSongs.map(
                (item, index) => (
                    <MusicBar
                        key={item.id}
                        headerWidth="10vh"
                        title={item.name}
                        subtitle={item.artist}
                        header={"#" + (index + 1)}
                        releaseDate={formatDate(item.releaseDate)}
                        usePlayedCount={item.playCount}
                        time={convertIntToTime(item.duration)}
                        onClick={() => handleOnClickSong(item.id)}
                    ></MusicBar>
                )
            )
        );

        setMonthSongs(
            dataSongs.map(
                (item, index) => (
                    <MusicBar
                        key={item.id}
                        headerWidth="10vh"
                        title={item.name}
                        subtitle={item.artist}
                        header={"#" + (index + 1)}
                        releaseDate={formatDate(item.releaseDate)}
                        usePlayedCount={item.playCount}
                        time={convertIntToTime(item.duration)}
                        onClick={() => handleOnClickSong(item.id)}
                    ></MusicBar>
                )
            )
        );

    }, []);

    const tabs = mostPlayedTabs.map(
        (item) => (
            <ToggleButton key={"mostplayed-tab-" + item.tabName} text={item.tabName}
                activeColor="#EE10B0" color="white" width="24vh" height="100%"
                active={item.path === tab} onClick={() => handleTabClick(item.path)}/>
        )
    );

    const tabComponents = {
        "day": 
            <MusicCollection
                musicList={daySongs} 
                title="Today Trending"
                titleHighlight="Songs"
                headerGap="10vh"
                disableViewAll={true}
            ></MusicCollection>,
        "week": 
            <MusicCollection
                musicList={weekSongs} 
                title="This Week Trending"
                titleHighlight="Songs"
                headerGap="10vh"
                disableViewAll={true}
            ></MusicCollection>,
        "month":
            <MusicCollection
                musicList={monthSongs} 
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
