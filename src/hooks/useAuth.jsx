import { useState, useEffect } from "react";


export const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('posts_token');
        if (token) {
            setUser({ token });
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
