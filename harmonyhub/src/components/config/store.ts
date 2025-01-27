import { signify } from "react-signify";


// Access token
export const sAccessToken = signify<string>("accessToken");
export const setsAccessToken = (value: string) => {
    sAccessToken.set(value);
};  

// Count 
export const sCount = signify<string>("777");