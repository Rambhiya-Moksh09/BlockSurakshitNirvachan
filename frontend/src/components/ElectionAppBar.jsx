import React from 'react';
import { AppBar, Box, Typography } from '@mui/material';
import BallotIcon from '@mui/icons-material/Ballot';
import LoginIcon from '@mui/icons-material/LoginOutlined';
import HowToRegIcon from '@mui/icons-material/HowToRegOutlined';
import InfoIcon from '@mui/icons-material/Info';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { Link } from 'react-router-dom';

const ElectionAppBar = () => {
    return (
        <AppBar sx={{ bgcolor: '#1B1B1B', py: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mx: 3.5 }}>
                <Box display="flex" alignItems="center">
                    <BallotIcon sx={{ mr: 1, fontSize: '2.5rem' }} />
                    <Typography variant="h4" component={Link} to="/" sx={{ textDecoration: 'none', color: '#FFFFFF' }}>
                        Block Surakshit Nirvachan
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" justifyContent='flex-end'>
                    <Typography variant="h5" component={Link} to="/election" sx={{ mr: 1, color: '#FFFFFF', textDecoration: 'none' }}>
                        Election
                    </Typography>
                    <HowToRegIcon sx={{ mr: 3, fontSize: '2rem' }} />

                    <Typography variant="h5" component={Link} to="/login" sx={{ mr: 1, color: '#FFFFFF', textDecoration: 'none' }}>
                        Login
                    </Typography>
                    <LoginIcon sx={{ mr: 3, fontSize: '2rem' }} />

                    <Typography variant="h5" component={Link} to="/admincontrol" sx={{ mr: 1, color: '#FFFFFF', textDecoration: 'none' }}>
                        Admin
                    </Typography>
                    <AdminPanelSettingsOutlinedIcon sx={{ mr: 3, fontSize: '2rem' }} />

                    <Typography variant="h5" component={Link} to="/details" sx={{ mr: 1, color: '#FFFFFF', textDecoration: 'none' }}>
                        Know More
                    </Typography>
                    <InfoIcon sx={{ mr: 3, fontSize: '2rem' }} />


                </Box>
            </Box>
        </AppBar>
    );
};

export default ElectionAppBar;
