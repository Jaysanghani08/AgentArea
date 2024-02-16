// AuthContext.js
import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { postRequest } from '../services/Api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check session storage for a user on component mount
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = async (userData) => {

        // Perform login logic here (e.g., send a request to a server)
        // If successful, set the user in the context and session storage
        console.log(userData);
        const response = await postRequest("admin/login", userData);
        // console.log(response);

        if (response.status === 200) {
            setUser(response.data);
            sessionStorage.setItem('user', JSON.stringify(response.data));
        }

        return response;
    };

    const signup = (userData) => {
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        // Perform logout logic here (e.g., clear session, remove user from context and session storage)
        setUser(null);
        sessionStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
