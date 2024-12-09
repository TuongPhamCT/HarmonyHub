import React from 'react';
import './MainPage.css'; // Import the CSS file for styling
import '../Global.css';
import Sidebar from './Sidebar';
import HomePage from '../HomePage/HomePage';
import SearchBar from './SearchBar';
import goUpButton from '../../assets/img/component_up.png';
import AlbumsPage from '../AlbumsPage/AlbumsPage';
import AllAlbumsPage from '../AlbumsPage/AllAlbumsPage';
import {Routes, Route} from "react-router-dom";
import DiscoverPage from '../DiscoverPage/DiscoverPage';
import { sMainController } from '../../store';
import ApprovePage from '../Approve/Approve';
import AddSongPage from '../AddSongPage/AddSong';
import LibraryPage from '../LibraryPage/LibraryPage';

const ssShowSidebar = sMainController.slice((n) => n.showSidebar);

function MainPage () {

    const handleGoUp = () => {
        const component = document.getElementById("content-area");
        component.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className="wrapper">
            <ssShowSidebar.Wrap>
                {(sidebarToggle) => (
                    <div className="mainpage_sidebar" style={{display: (sidebarToggle ? 'flex' : 'none' )}}>
                        <Sidebar/>
                    </div>   
                )}
            </ssShowSidebar.Wrap>
            <img id="go-up-button" src={goUpButton} alt="" className="txt_button" onClick={handleGoUp}></img>
            <div className="mainpage_content_wrapper">
                <div className="mainpage_header">
                    <SearchBar/>
                </div>
                <div id="content-area" className="mainpage_content">
                    <Routes>
                        <Route path='/' element={<HomePage/>} />
                        <Route path='/discover' element={<DiscoverPage/>} />
                        <Route path='/albums' element={<AlbumsPage/>} />
                        <Route path='/albums/:view' element={<AllAlbumsPage/>} />
                        <Route path='/approve' element={<ApprovePage/>} />
                        <Route path='/addsong' element={<AddSongPage/>} />
                        <Route path='/library/*' element={<LibraryPage/>} />
                    </Routes>
                    {/* <sMainController.DevTool name="sMainController"/> */}
                </div>
            </div>
        </div>
    );
}

export default MainPage;