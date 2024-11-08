import React, { useState } from 'react';
import './MainPage.css'; // Import the CSS file for styling
import '../Global.css';
import Sidebar from './Sidebar';
import HomePage from '../HomePage/HomePage';
import SearchBar from './SearchBar';
import goUpButton from '../../assets/img/component_up.png';
//import AllAlbumsPage from '../AlbumsPage/AllAlbumsPage';

const MainPage = () => {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [inDetailToggle, setInDetailToggle] = useState(false);
    
    const updateSidebarToggle = (newState) => {
        setSidebarToggle(newState);
    }

    const updateInDetailToggle = (newState) => {
        setInDetailToggle(newState);
    }

    const goUp = () => {
        const component = document.getElementById("content-area");
        component.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div class="wrapper">
            <div class="mainpage_sidebar" style={{display: (sidebarToggle ? 'none' : 'flex' )}}>
                <Sidebar sidebarToggle={sidebarToggle} updateParent={updateSidebarToggle}></Sidebar>
            </div>
            <img id="go-up-button" src={goUpButton} alt="" class="txt_button" onClick={goUp}></img>
            <div class="mainpage_content_wrapper">
                <div class="mainpage_header">
                    <SearchBar
                        sidebarToggle={sidebarToggle}
                        inDetailToggle={inDetailToggle}
                        updateSidebar={updateSidebarToggle}
                        updateInDetailToggle={updateInDetailToggle}
                        isLogin={true}>
                    </SearchBar>
                </div>
                <div id="content-area" class="mainpage_content">
                    <HomePage/>
                    {/* <AllAlbumsPage/> */}
                </div>
            </div>
        </div>
    );
}

export default MainPage;