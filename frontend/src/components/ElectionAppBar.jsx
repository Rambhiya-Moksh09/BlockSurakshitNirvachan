import React, { useContext } from 'react';
import { AppBar, Box, Typography } from '@mui/material';
import BallotIcon from '@mui/icons-material/Ballot';
import LoginIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HowToRegIcon from '@mui/icons-material/HowToRegOutlined';
import InfoIcon from '@mui/icons-material/Info';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { Link } from 'react-router-dom';

import { AuthContext } from '../utils/AuthContext.js';  // For normal users
import { AdminAuthContext } from '../utils/AdminAuthContext.js';  // For admin login

const ElectionAppBar = () => {
    const { isLoggedIn, logout } = useContext(AuthContext); // User login/logout functionality
    const { isAdminLoggedIn } = useContext(AdminAuthContext); // Admin login/logout functionality

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
                    {/* User specific functionality */}
                    <Typography variant="h5" component={Link} to="/election" sx={{ mr: 1, color: '#FFFFFF', textDecoration: 'none', fontFamily: 'Rajdhani, sans-serif' }}>
                        Election
                    </Typography>
                    <HowToRegIcon sx={{ mr: 3, fontSize: '2rem' }} />

                    {/* Check if user is logged in */}
                    {isLoggedIn ? (
                        <>
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
                            <LoginIcon sx={{ mr: 3, fontSize: '2rem', fontFamily: 'Rajdhani, sans-serif' }} />
                        </>
                    )}

                    {/* Admin specific functionality */}
                    <Typography
                        variant="h5"
                        component={Link}
                        to={isAdminLoggedIn ? "/setElections" : "/adminlogin"}  // Navigate based on admin login status
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
