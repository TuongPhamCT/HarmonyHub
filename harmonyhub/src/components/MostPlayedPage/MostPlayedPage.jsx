import '../../components/Global.css';
import Footer from '../MainPage/Footer';
import '../MostPlayedPage/MostPlayedPage.css';
// import ItemBox, { AlbumBox, MvBox } from '../SmallComponents/ItemBox';
// import ItemCollectionVertical from '../SmallComponents/ItemCollectionVertical';
import { ToggleButton } from '../SmallComponents/ToggleButton';
// import { TextButton } from '../SmallComponents/TextButton';
// import { sComponents } from '../SmallComponents/componentStore';
import { useEffect, useState } from 'react';
import { SongService } from '../../services/apiCall/song';
import { formatDate, getPreviousDate, getToday } from '../../services/formatDateService';
import { handleOnClickSong } from '../../services/itemOnClickService';
import { convertIntToTime } from '../MainPage/services/playbarServices';
import MusicBar from '../SmallComponents/MusicBar';
import MusicCollection from '../SmallComponents/MusicCollection';

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
        const controller = new AbortController(); 
        const fetchData =  async () => {
            const today = getToday();

            const dayData = await SongService.getMostPlayedSongs({
                numberOfSongs: 50,
                startTime: getPreviousDate(1, today),
                endTime: today, 
            }).songs;

            const weekData = await SongService.getMostPlayedSongs({
                numberOfSongs: 50,
                startTime: getPreviousDate(7, today),
                endTime: today, 
            }).songs;

            const monthData = await SongService.getMostPlayedSongs({
                numberOfSongs: 50,
                startTime: getPreviousDate(30, today),
                endTime: today, 
            }).songs;

            setDaySongs(
                dayData.map(
                    (item, index) => (
                        <MusicBar
                            key={item.id}
                            data={item}
                            headerWidth="10vh"
                            title={item.name}
                            subtitle={item.artist}
                            header={"#" + (index + 1)}
                            releaseDate={formatDate(item.releaseDate)}
                            played={item.playCount}
                            time={convertIntToTime(item.duration)}
                            onClick={() => handleOnClickSong(item)}
                        ></MusicBar>
                    )
                )
            );
    
            setWeekSongs(
                weekData.map(
                    (item, index) => (
                        <MusicBar
                            key={item.id}
                            data={item}
                            headerWidth="10vh"
                            title={item.name}
                            subtitle={item.artist}
                            header={"#" + (index + 1)}
                            releaseDate={formatDate(item.releaseDate)}
                            played={item.playCount}
                            time={convertIntToTime(item.duration)}
                            onClick={() => handleOnClickSong(item)}
                        ></MusicBar>
                    )
                )
            );
    
            setMonthSongs(
                monthData.map(
                    (item, index) => (
                        <MusicBar
                            key={item.id}
                            data={item}
                            headerWidth="10vh"
                            title={item.name}
                            subtitle={item.artist}
                            header={"#" + (index + 1)}
                            releaseDate={formatDate(item.releaseDate)}
                            played={item.playCount}
                            time={convertIntToTime(item.duration)}
                            onClick={() => handleOnClickSong(item)}
                        ></MusicBar>
                    )
                )
            );
        }

        fetchData();
        return () => {
            controller.abort(); // Cleanup function: hủy request khi component unmount
        };
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
                usePlayedCount={true}
                disableViewAll={true}
            ></MusicCollection>,
        "week": 
            <MusicCollection
                musicList={weekSongs} 
                title="This Week Trending"
                titleHighlight="Songs"
                headerGap="10vh"
                usePlayedCount={true}
                disableViewAll={true}
            ></MusicCollection>,
        "month":
            <MusicCollection
                musicList={monthSongs} 
                title="This Month Trending"
                titleHighlight="Songs"
                headerGap="10vh"
                usePlayedCount={true}
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
