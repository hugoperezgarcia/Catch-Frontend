import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("userId");
        if(storedUser){
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    if (!loading) {
        return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
        )
    }

}
