import {signify} from "react-signify";

export const sUser = signify ({
    loggedUser: null
});

export const sMainController = signify ({
    showHeaderBackButton: false,
    showSignUp: false,
    showLogIn: false,
    showSidebar: true
});