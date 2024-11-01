//import React from 'react';
import './MainPage.css'; // Import the CSS file for styling
import Sidebar from './Sidebar';
import HomePage from '../HomePage/HomePage';
import SearchBar from './SearchBar';

const MainPage = () => {
    return (
        <div class="wrapper">
            <div class="mainpage_sidebar">
                <Sidebar></Sidebar>
            </div>
            <div class="mainpage_content_wrapper">
                <div class="mainpage_header">
                    <SearchBar></SearchBar>
                </div>
                <div class="mainpage_content">
                    <HomePage></HomePage>
                </div>
            </div>
        </div>
    );
}

export default MainPage;