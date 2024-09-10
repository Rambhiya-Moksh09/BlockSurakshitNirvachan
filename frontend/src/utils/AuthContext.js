import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = async () => {
        try {
            const app = await axios.post('http://localhost:5000/users/logout', {}, { withCredentials: true })
            console.log(app)
            setIsLoggedIn(false);
            alert('Logout Successful')
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
