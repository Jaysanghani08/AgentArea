// AuthContext.js
import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { postRequest } from '../services/Api';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const [user, setUser] = useState(null);

    // console.log("auth context");
    // useEffect(() => {
    //     // Check session storage for a user on component mount
    //     const user1 = Cookies.get('user');
    //     console.log("herereereee");
    //     if (user1) {
    //         setUser(user1);
    //     }
    // }, []);

    const login = async (userData, type) => {

        console.log(userData);
        const response = await postRequest(`${type}/login`, userData);

        if (response.status === 200) {
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (1 * 60 * 60 * 1000));
            Cookies.set('user', JSON.stringify(response.data), { secure: true, sameSite: 'strict', expires: expirationDate});
        }

        return response;
    };

    const signup = (userData) => {
        // setUser(userData);
        Cookies.set('user', userData, { expires: 0 });
    };

    const logout = () => {
        // Perform logout logic here (e.g., clear session, remove user from context and session storage)
        // setUser(null);
        Cookies.remove('user');
    };

    return (
        <AuthContext.Provider value={{ login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
