import React from 'react';
import { AppBar, Box, Typography } from '@mui/material';
import BallotIcon from '@mui/icons-material/Ballot';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MoreIcon from '@mui/icons-material/More';

export const ElectionAppBar = () => {
    return (
        <AppBar sx={{ bgcolor: '#050206', py: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mx: 3.5 }}>
                <Box display="flex" alignItems="center">
                    <BallotIcon sx={{ mr: 1, fontSize: '2.5rem ' }} />
                    <Typography variant="h4">Block Surakshit Nirvachan</Typography>
                </Box>

                <Box display="flex" alignItems="center">
                    <Typography variant="h5" component='a' href='/election' sx={{ mr: 1, color: '#FFFFFF', textDecoration: 'none' }}>Election</Typography>
                    <HowToRegIcon sx={{ mr: 3, fontSize: '2rem' }} />
                    <Typography variant="h5" component='a' href='/election' sx={{ mr: 1, color: '#FFFFFF', textDecoration: 'none' }}>Know More</Typography>
                    <MoreIcon sx={{ mr: 3, fontSize: '2rem' }} />
                    <Typography variant="h5" component='a' href='/election' sx={{ mr: 1, color: '#FFFFFF', textDecoration: 'none' }}>Login</Typography>
                    <LoginIcon />
                </Box>
            </Box>
        </AppBar>
    );
};
