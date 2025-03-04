import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('isLoggedIn') === 'true'
    );
    const [metamaskAccount, setMetamaskAccount] = useState(
        localStorage.getItem('metamaskAccount') || null
    );
    const [availableAccounts, setAvailableAccounts] = useState([]);

    const checkAuth = async () => {
        try {
            const response = await axios.get('http://localhost:5000/auth/check', { withCredentials: true });
            if (response.status === 200) {
                setIsLoggedIn(true);
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
            setMetamaskAccount(null);
            setAvailableAccounts([]);
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.removeItem('metamaskAccount');
            alert('Logout Successful');
        } catch (error) {
            console.log('Logout failed:', error.message);
        }
    };

    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                const web3 = new Web3(window.ethereum);
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

                if (accounts.length > 0) {
                    setAvailableAccounts(accounts);
                    setMetamaskAccount(accounts[0]); // Default to first account
                    localStorage.setItem('metamaskAccount', accounts[0]);
                } else {
                    console.log("No MetaMask accounts found.");
                }
            } catch (error) {
                console.log("MetaMask connection failed:", error.message);
            }
        } else {
            alert("Please install MetaMask.");
        }
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn, login, logout, metamaskAccount, connectMetaMask, availableAccounts, setMetamaskAccount
        }}>
            {children}
        </AuthContext.Provider>
    );
};
