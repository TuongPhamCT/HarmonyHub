import { useRef } from "react";
import SignUp from "../SignUp/SignUp";
import "./SearchBar.css";
import "../../components/Global.css";
import searchbox from "../../assets/img/header_search_bar.png";
import search_icon from "../../assets/img/header_search_icon.png";
import sidebar_icon from "../../assets/img/sidebar_menu_icon.png";
import header_profile from "../../assets/img/header_profile.png";
import back_icon from "../../assets/img/header_back.png";
import { sMainController, sUser } from "../../store";

//const ssShowLogin = sHeaderController.slice(n => n.showLogIn);
const ssShowSignUp = sMainController.slice((n) => n.showSignUp);

const SearchBarGuestMode = ({ toggleSignUpFunction }) => {
  const handleSignUpButton = () => {
    toggleSignUpFunction();
  }

  return (
    <div className="searchbar_right">
      <p id="header_signup" className="txt_button" onClick={handleSignUpButton}>
        Sign Up
      </p>
      <p id="header_login" className="txt_button">
        Login
      </p>
      <h2>Premium</h2>
      <h2>Contact</h2>
      <h2>About Us</h2>
    </div>
  );
}

const SearchBarLoggedMode = () => {
  return (
    <div className="searchbar_right">
      <img id="header-profile-button" src={header_profile} className="txt_button" alt="" />
      <h2>Premium</h2>
      <h2>About</h2>
      <h2>Share</h2>
    </div>
  );
}

const SearchBar = () => {
  //ref for the signup modal
  const signUpRef = useRef();

  //function to show the modal
  const showSignUpModal = () => {
    signUpRef.current.showModal();
    sMainController.set((v) => v.value.showSignUp = true);
  };

  //function to hide the modal
  const hideSignUpModal = () => {
    signUpRef.current.close();
    sMainController.set((v) => v.value.showSignUp = false);
  };

  //function to toggle the sidebar
  const handleSidebarIconClick = () => {
    // Call the function passed from the parent to update its state
    sMainController.set((v) => v.value.showSidebar = !v.value.showSidebar);
  };

  //function to toggle the back button
  const handleBackIconClick = () => {
    // Call the function passed from the parent to update its state
    sMainController.set((v) => v.value.showHeaderBackButton = !v.value.showHeaderBackButton);
  };


  return (
    <div className="searchbar">
      <ssShowSignUp.Wrap>
        {(signUpToggle) => (
          <SignUp
            ref={signUpRef}
            handleClose={hideSignUpModal}
            isVisible={signUpToggle}
          />
        )}
      </ssShowSignUp.Wrap>
      <sMainController.Wrap>
        {(controller) => (
          <div className="searchbar_left_wrapper">
            <img
              src={sidebar_icon}
              id="searchbox_sidebar_button"
              className="txt_button"
              alt=""
              style={{ display: !controller.showSidebar ? "flex" : "none" }}
              onClick={handleSidebarIconClick}
            ></img>
            <img
              src={back_icon}
              id="searchbox_back_button"
              className="txt_button"
              alt=""
              style={{ display: controller.showHeaderBackButton ? "flex" : "none" }}
              onClick={handleBackIconClick}
            ></img>
            <div className="searchbar_left" style={{ display: !controller.showHeaderBackButton ? "flex" : "none" }}>
              <img id="searchbox_background" src={searchbox} alt=""></img>
              <img
                id="searchbox_button"
                src={search_icon}
                className="txt_button"
                alt=""
              ></img>
              <input
                type="text"
                id="searchbox_input"
                placeholder="Search for Musics, Artists, ..."
              ></input>
            </div>
          </div>
        )}
      </sMainController.Wrap>
      <sUser.Wrap>
        {() => (sUser.value.loggedUser ? <SearchBarLoggedMode /> : <SearchBarGuestMode toggleSignUpFunction={showSignUpModal} />)}
      </sUser.Wrap>
    </div>
  );
};

export default SearchBar;
