import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    // Función para codificar en Base64
    const encodeBase64 = (str) => {
        return btoa(str);
    };

    // Función para decodificar de Base64
    const decodeBase64 = (str) => {
        return atob(str);
    };

    useEffect(() => {
        const storedUser = sessionStorage.getItem("userId");
        if (storedUser) {
            const decodedUser = decodeBase64(storedUser);
            setUser(decodedUser);
        }
        setLoading(false);
    }, []);

    const handleSetUser = (userId) => {
        const encodedUser = encodeBase64(userId);
        sessionStorage.setItem("userId", encodedUser);
        setUser(userId);
    };

    if (!loading) {
        return (
            <UserContext.Provider value={{ user, setUser: handleSetUser }}>
                {children}
            </UserContext.Provider>
        );
    }

    return <Loader />; 
}
