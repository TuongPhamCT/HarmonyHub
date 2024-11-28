import React from 'react';
import '../HomePage/HomePage.css'; // Import the CSS file for styling
import '../../components/Global.css'
import Footer from '../MainPage/Footer';
import ApproveMusicBar from '../SmallComponents/ApproveMusicBar';
import AdminMusicCollection from '../SmallComponents/AdminMusicCollection';

const demoList = [
    "song1", "song2", "song3", "song4", "song5", "song6", "song7", "song8", "song9", "song10"
]

const ApprovePage = () => {
    
    const musicCollection = demoList.map(
        (item, index) => (
            <ApproveMusicBar key={"mb" + index} headerWidth="10vh" title={item} subtitle="random subtitle" header={"#" + (index + 1)}
                releaseDate={"Nov " + (index + 1) + ", 2024"} album="Demo Album" time="2:00"></ApproveMusicBar>           
        )
    )

    return (
        <div className="homepage">
            <br/>
            <br/>
            <div>
                <AdminMusicCollection musicList={musicCollection} title="New" titleHighlight="Songs" headerGap="10vh"></AdminMusicCollection>
            </div>
            <Footer/>
        </div>
    );
}

export default ApprovePage;