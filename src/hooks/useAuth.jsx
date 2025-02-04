import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


export const useAuth = () => {
    const [user, setUser] = useState(null);

    const isTokenExpired = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error("Failed to decode token:", error);
            return true; // Assume the token is invalid/expired
        }
    };




    useEffect(() => {
        const token = localStorage.getItem('posts_token');
        if (token && !isTokenExpired(token)) {
            setUser({ token });
        } else if (token) {
            logOut(); // Automatically log out if the token is expired
        }
    }, []);

    const loggIn = (token) => {
        localStorage.setItem('posts_token', token);
        setUser({ token });
    };

    const logOut = () => {
        localStorage.removeItem('posts_token');
        setUser(null);
    };



    return { user, logOut, loggIn };
};
