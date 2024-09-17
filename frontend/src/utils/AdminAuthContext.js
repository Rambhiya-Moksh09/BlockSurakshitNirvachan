import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create AdminAuthContext
export const AdminAuthContext = createContext();

// AdminAuthProvider component to wrap around your app
export const AdminAuthProvider = ({ children }) => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
        localStorage.getItem('isAdminLoggedIn') === 'true'
    );

    const checkAdminAuth = async () => {
        try {
            const response = await axios.get('http://localhost:5000/auth/adminCheck', { withCredentials: true });
            if (response.status === 200) {
                setIsAdminLoggedIn(true);
                localStorage.setItem('isAdminLoggedIn', 'true');
            } else {
                setIsAdminLoggedIn(false);
                localStorage.setItem('isAdminLoggedIn', 'false');
            }
        } catch (error) {
            setIsAdminLoggedIn(false);
            localStorage.setItem('isAdminLoggedIn', 'false');
            console.log('Admin Authentication check failed:', error);
        }
    };

    useEffect(() => {
        checkAdminAuth();
    }, []);

    const adminLogin = () => {
        setIsAdminLoggedIn(true);
        localStorage.setItem('isAdminLoggedIn', 'true');
    };

    const adminLogout = async () => {
        try {
            await axios.post('http://localhost:5000/admins/adminLogout', {}, { withCredentials: true });
            setIsAdminLoggedIn(false);
            localStorage.setItem('isAdminLoggedIn', 'false');
            alert('Admin Logout Successful');

        } catch (error) {
            console.log('Admin Logout failed:', error.message);
        }
    };

    return (
        <AdminAuthContext.Provider value={{ isAdminLoggedIn, adminLogin, adminLogout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};
