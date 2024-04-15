import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUser = async () => {
        const userId = sessionStorage.getItem("userId");
        if (userId) {
            try {
                const response = await axios.get("https://catchit-back-production.up.railway.app/api/admin/" + userId);
                setUser(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    if (!loading) {
        return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
        )
    }

    if (error) {
        return <ErrorMessage error={error} />;
    }
}

const ErrorMessage = ({ error }) => {
    return <div>Error: {error.message}</div>;
};
