import React, { useState } from 'react';
import './MainPage.css'; // Import the CSS file for styling
import Sidebar from './Sidebar';
import HomePage from '../HomePage/HomePage';
import SearchBar from './SearchBar';

const MainPage = () => {
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
                    <HomePage></HomePage>
                </div>
            </div>
        </div>
    );
}

export default MainPage;