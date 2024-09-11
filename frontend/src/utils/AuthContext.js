import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('isLoggedIn') === 'true'
    );

    const checkAuth = async () => {
        try {
            const response = await axios.get('http://localhost:5000/auth/check', { withCredentials: true });
            if (response.status === 200) {
                setIsLoggedIn(true);
                console.log('Authorisation successful')
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                setIsLoggedIn(false);
                localStorage.setItem('isLoggedIn', 'false');
            }

        } catch (error) {
            setIsLoggedIn(false);
            localStorage.setItem('isLoggedIn', 'false');
            console.log('Authentication check failed:', error.message);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:5000/public/logout', {}, { withCredentials: true });
            setIsLoggedIn(false);
            localStorage.setItem('isLoggedIn', 'false');
            alert('Logout Successful');
        } catch (error) {
            console.log('Logout failed:', error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};