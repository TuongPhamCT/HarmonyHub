import { useRef, useState } from "react";
import SignUp from "../SignUp/SignUp";
import './SearchBar.css';
import '../../components/Global.css';
import searchbox from '../../assets/img/header_search_bar.png';
import search_icon from '../../assets/img/header_search_icon.png';

const SearchBar = () => {

    //ref for the signup modal
    const signUpRef = useRef();

    //state to check if the modal is visible
    const [isModalVisible, setIsModalVisible] = useState(false);

    //function to show the modal
    const showSignUpModal = () => {
      signUpRef.current.showModal();
      setIsModalVisible(true);
    };

    //function to hide the modal
    const hideSignUpModal = () => {
      signUpRef.current.close();
      setIsModalVisible(false);
    };

    return (  
        <div class="searchbar">
            <SignUp ref={signUpRef} handleClose={hideSignUpModal} style={{display: (isModalVisible ? 'flex' : 'none')}}/>
            <div class="searchbar_left">
                <img id="searchbox_background" src={searchbox} alt=""></img>
                <img id="searchbox_button" src={search_icon} class="txt_button" alt=""></img>
                <input type="text" id="searchbox_input" placeholder="Search for Musics, Artists, ..."></input>
            </div>
            <div class="searchbar_right">
                <p id="header_signup" class="txt_button" onClick={showSignUpModal}>Sign Up</p>
                <p id="header_login" class="txt_button">Login</p>
                <h2>Premium</h2>
                <h2>Contact</h2>
                <h2>About Us</h2>
            </div>
        </div>
    );
}
 
export default SearchBar;