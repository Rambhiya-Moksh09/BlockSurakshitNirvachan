import React, { useContext, useEffect } from 'react';
import { AppBar, Box, Typography, Button, MenuItem, Select } from '@mui/material';
import BallotIcon from '@mui/icons-material/Ballot';
import LoginIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HowToRegIcon from '@mui/icons-material/HowToRegOutlined';
import InfoIcon from '@mui/icons-material/Info';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { Link } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext.js';
import { AdminAuthContext } from '../utils/AdminAuthContext.js';

const ElectionAppBar = () => {
    const { isLoggedIn, logout, metamaskAccount, connectMetaMask, availableAccounts, setMetamaskAccount } = useContext(AuthContext);
    const { isAdminLoggedIn } = useContext(AdminAuthContext);

    // Ensure availableAccounts are loaded correctly
    useEffect(() => {
        if (availableAccounts.length > 0 && !availableAccounts.includes(metamaskAccount)) {
            setMetamaskAccount(availableAccounts[0]); // Default to the first available account
            localStorage.setItem("metamaskAccount", availableAccounts[0]);
        }
    }, [availableAccounts, metamaskAccount, setMetamaskAccount]);

    return (
        <AppBar sx={{ bgcolor: '#1B1B1B', py: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mx: 3.5 }}>
                <Box display="flex" alignItems="center">
                    <BallotIcon sx={{ mr: 1, fontSize: '2.5rem' }} />
                    <Typography variant="h4" component={Link} to="/" sx={{ textDecoration: 'none', color: '#FFFFFF', fontFamily: 'Rajdhani, sans-serif' }}>
                        Block Surakshit Nirvachan
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" justifyContent="flex-end">
                    <Typography variant="h5" component={Link} to="/election" sx={{ mr: 1, color: '#FFFFFF', textDecoration: 'none', fontFamily: 'Rajdhani, sans-serif' }}>
                        Election
                    </Typography>
                    <HowToRegIcon sx={{ mr: 3, fontSize: '2rem' }} />

                    {/* If user is logged in */}
                    {isLoggedIn ? (
                        <>
                            {/* MetaMask Account Selection */}
                            {availableAccounts.length > 0 ? (
                                <Select
                                    value={availableAccounts.includes(metamaskAccount) ? metamaskAccount : ""}
                                    onChange={(e) => {
                                        setMetamaskAccount(e.target.value);
                                        localStorage.setItem("metamaskAccount", e.target.value);
                                    }}
                                    displayEmpty
                                    disabled={availableAccounts.length === 0}
                                    sx={{ mr: 3, color: "#FFFFFF", backgroundColor: "#333", borderRadius: "5px", padding: "5px" }}
                                >
                                    {availableAccounts.map((account) => (
                                        <MenuItem key={account} value={account}>
                                            {account.slice(0, 6)}...{account.slice(-4)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            ) : (
                                <Button variant="contained" color="warning" onClick={connectMetaMask} sx={{ mr: 3 }}>
                                    Connect MetaMask
                                </Button>
                            )}

                            {/* Logout Button */}
                            <Typography
                                variant="h5"
                                onClick={logout}
                                sx={{ mr: 1, color: '#FFFFFF', cursor: 'pointer', textDecoration: 'none', fontFamily: 'Rajdhani, sans-serif' }}
                            >
                                Logout
                            </Typography>
                            <LogoutOutlinedIcon sx={{ mr: 3, fontSize: '2rem' }} />
                        </>
                    ) : (
                        <>
                            <Typography
                                variant="h5"
                                component={Link}
                                to="/login"
                                sx={{ mr: 1, color: '#FFFFFF', textDecoration: 'none', fontFamily: 'Rajdhani, sans-serif' }}
                            >
                                Login
                            </Typography>
                            <LoginIcon sx={{ mr: 3, fontSize: '2rem' }} />
                        </>
                    )}

                    {/* Admin Section */}
                    <Typography
                        variant="h5"
                        component={Link}
                        to={isAdminLoggedIn ? "/setElections" : "/adminlogin"}
                        sx={{ mr: 1, color: '#FFFFFF', textDecoration: 'none', fontFamily: 'Rajdhani, sans-serif' }}
                    >
                        Admin
                    </Typography>
                    <AdminPanelSettingsOutlinedIcon sx={{ mr: 3, fontSize: '2rem' }} />

                    <Typography variant="h5" component={Link} to="/details" sx={{ mr: 1, color: '#FFFFFF', textDecoration: 'none', fontFamily: 'Rajdhani, sans-serif' }}>
                        Know More
                    </Typography>
                    <InfoIcon sx={{ mr: 3, fontSize: '2rem' }} />
                </Box>
            </Box>
        </AppBar>
    );
};

export default ElectionAppBar;
