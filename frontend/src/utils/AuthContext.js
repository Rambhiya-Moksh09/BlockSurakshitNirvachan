import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Get the initial value from localStorage, fallback to false if no value exists
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('isLoggedIn') === 'true' // Convert string to boolean
    );

    const checkAuth = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users/', { withCredentials: true });

            if (response.status === 200) {
                setIsLoggedIn(true);
                console.log('Authorisex successful', response.data)
                localStorage.setItem('isLoggedIn', 'true');  // Persist login state in localStorage
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

    // useEffect(() => {
    //     checkAuth();
    // }, []);

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');  // Store login state
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:5000/public/logout', {}, { withCredentials: true });
            setIsLoggedIn(false);
            localStorage.setItem('isLoggedIn', 'false');  // Clear login state
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