import React, { useContext } from 'react';
import { AppBar, Box, Typography } from '@mui/material';
import BallotIcon from '@mui/icons-material/Ballot';
import LoginIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HowToRegIcon from '@mui/icons-material/HowToRegOutlined';
import InfoIcon from '@mui/icons-material/Info';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { Link } from 'react-router-dom';

import { AdminAuthContext } from '../utils/AdminAuthContext.js';

const AdminAppBar = () => {
    const { isAdminLoggedIn, adminLogout } = useContext(AdminAuthContext);

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
                    <Typography variant="h5" component={Link} to="/setElections" sx={{ mr: 1, color: '#FFFFFF', textDecoration: 'none', fontFamily: 'Rajdhani, sans-serif' }}>
                        Set Elections
                    </Typography>
                    <AdminPanelSettingsOutlinedIcon sx={{ mr: 3, fontSize: '2rem' }} />

                    <Typography variant="h5" component={Link} to="/admincontrols" sx={{ mr: 1, color: '#FFFFFF', textDecoration: 'none', fontFamily: 'Rajdhani, sans-serif' }}>
                        Add Candidates
                    </Typography>
                    <InfoIcon sx={{ mr: 3, fontSize: '2rem' }} />

                    <Typography variant="h5" component={Link} to="/election" sx={{ mr: 1, color: '#FFFFFF', textDecoration: 'none', fontFamily: 'Rajdhani, sans-serif' }}>
                        Election
                    </Typography>
                    <HowToRegIcon sx={{ mr: 3, fontSize: '2rem' }} />

                    {isAdminLoggedIn ? (
                        <>
                            <Typography
                                variant="h5"
                                onClick={adminLogout}
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
                                to="/adminlogin"
                                sx={{ mr: 1, color: '#FFFFFF', textDecoration: 'none', fontFamily: 'Rajdhani, sans-serif' }}
                            >
                                Admin Login
                            </Typography>
                            <LoginIcon sx={{ mr: 3, fontSize: '2rem' }} />
                        </>
                    )}
                </Box>
            </Box>
        </AppBar>
    );
};

export default AdminAppBar;
