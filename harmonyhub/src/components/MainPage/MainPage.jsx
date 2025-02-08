import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import goUpButton from '../../assets/img/component_up.png';
import { SongService } from '../../services/apiCall/song.js';
import { autoLogin } from '../../services/loginService.js';
import { sMainController, sPlaybar } from '../../store.js';
import AddSongPage from '../AddSongPage/AddSong';
import AlbumDetailsPage from '../AlbumDetailsPage/AlbumDetailsPage';
import AlbumsPage from '../AlbumsPage/AlbumsPage';
import AllAlbumsPage from '../AlbumsPage/AllAlbumsPage';
import AllGenresPage from '../AllGenresPage/AllGenresPage';
import AllPlaylistsPage from '../AllPlaylistsPage/AllPlaylistsPage';
import AllSongsPage from '../AllSongsPage/AllSongsPage';
import YourFavoritesPage from '../AllSongsPage/YourFavoritesPage.jsx';
import ApprovePage from '../Approve/Approve';
import ArtistDetailPage from '../ArtistsPage/ArtistDetail';
import ArtistsPage from '../ArtistsPage/ArtistsPage';
import { sAccessToken } from '../config/store.ts';
import AboutPage from '../contact/about';
import PolicyPage from '../contact/policy';
import SocialMediaPage from '../contact/social_media';
import SupportPage from '../contact/support';
import { useFavorite } from '../Contexts/FavoriteContext.jsx';
import DiscoverPage from '../DiscoverPage/DiscoverPage';
import '../Global.css';
import HomePage from '../HomePage/HomePage';
import LibraryPage from '../LibraryPage/LibraryPage';
import MostPlayedPage from '../MostPlayedPage/MostPlayedPage';
import PlaylistDetailPage from '../PlaylistDetailPage/PlaylistDetailPage';
import SearchResultsPage from '../SearchResultsPage/SearchResultsPage';
import PlaylistDetail from '../YourPlaylistPage/PlaylistDetail';
import YourPlaylist from '../YourPlaylistPage/YourPlaylist';
import './MainPage.css'; // Import the CSS file for styling
import Playbar from './Playbar';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';

const ssShowSidebar = sMainController.slice((n) => n.showSidebar);
const ssPlayingSong = sPlaybar.slice((n) => n.playingSong);
const ssCanScrollContent = sMainController.slice((n) => n.canScroll);

function MainPage() {
    const { pathname } = useLocation();
    const { toggleFavorites } = useFavorite();

    const handleGoUp = () => {
        const component = document.getElementById("content-area");
        component.scrollTo({ top: 0, behavior: "smooth" });
    }

    // handle Scrolling content area
    const handleContentScroll = (e) => {
        if (ssCanScrollContent.value === false) {
            e.preventDefault();
        }
    };

    // tự scroll lên top khi đổi path
    useEffect(() => {
        const component = document.getElementById("content-area");
        component.scrollTo({ top: 0 });
    }, [pathname]);

    // Initialize
    useEffect(() => {
        // handle Content Scroll
        const component = document.getElementById("content-area");
        component.addEventListener('wheel', handleContentScroll, { passive: false });

        // login
        autoLogin();
        // setup Favorites song of user
        if (sAccessToken.value) {
            const fetchData = async () => {
                // load favorite song by API
                const songData = await SongService.getFavoriteSongs({
                    page: 1,
                    limit: 100,
                    sortBy: "name",
                    order: "asc",
                    search: "",
                }).songs || [];

                songData.forEach((song) => {
                    toggleFavorites(song.id);
                });
            }

            fetchData();
        }
    }, [toggleFavorites]);

    return (
        <div className="playbar-wrapper">
            <ssPlayingSong.Wrap>
                {(playingSong) => (
                    <div className="playbar" style={{ display: (playingSong !== null ? 'flex' : 'none') }}>
                        <Playbar />
                    </div>
                )}
            </ssPlayingSong.Wrap>
            <div className="wrapper">
                <ssShowSidebar.Wrap>
                    {(sidebarToggle) => (
                        <div className="mainpage_sidebar" style={{ display: (sidebarToggle ? 'flex' : 'none') }}>
                            <Sidebar />
                        </div>
                    )}
                </ssShowSidebar.Wrap>
                <img id="go-up-button" src={goUpButton} alt="" className="txt_button" onClick={handleGoUp}></img>

                <div className="mainpage_content_wrapper">
                    <div className="mainpage_header">
                        <SearchBar />
                    </div>
                    <div id="content-area" className="mainpage_content">
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/discover' element={<DiscoverPage />} />
                            <Route path='/albums' element={<AlbumsPage />} />
                            <Route path='/albums/:view' element={<AllAlbumsPage />} />
                            <Route path='/artist' element={<ArtistsPage />} />
                            <Route path='/artist/:id' element={<ArtistDetailPage />} />
                            <Route path='/yourplaylist' element={<YourPlaylist />} />
                            <Route path='/yourplaylist/:id' element={<PlaylistDetail />} />
                            <Route path='/approve' element={<ApprovePage />} />
                            <Route path='/addsong' element={<AddSongPage />} />
                            <Route path='/library' element={<LibraryPage />} />
                            <Route path='/about_us' element={<AboutPage />} />
                            <Route path='/policy' element={<PolicyPage />} />
                            <Route path='/social_media' element={<SocialMediaPage />} />
                            <Route path='/support' element={<SupportPage />} />
                            <Route path='/search/results' element={<SearchResultsPage />} />
                            <Route path='/albumdetails/:albumId' element={<AlbumDetailsPage />} />
                            <Route path='/mostplayed' element={<MostPlayedPage />} />
                            <Route path='/songs/:view' element={<AllSongsPage />} />
                            <Route path='/playlists/:view' element={<AllPlaylistsPage />} />
                            <Route path='/playlist/:playlistId' element={<PlaylistDetailPage />} />
                            <Route path='/genres' element={<AllGenresPage />} />
                            <Route path='/favorites' element={<YourFavoritesPage />} />
                        </Routes>
                        {/* <sMainController.DevTool name="sMainController"/> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;