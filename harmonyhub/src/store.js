import {signify} from "react-signify";

export const sUser = signify ({
    loggedUser: null
});

export const sMainController = signify ({
    showHeaderBackButton: false,
    showHeaderSearchBar: true,
    showSignUp: false,
    showSignIn: false,
    showSidebar: true
});