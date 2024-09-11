import React from 'react';
import { Box, Typography, Button, Container, useScrollTrigger } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CelebrationIcon from '@mui/icons-material/Celebration';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

import ElectionAppBar from '../components/ElectionAppBar';
import { Link } from 'react-router-dom';
// import ElectionImage from '../public/Election.jpg';

const ScrollAnimation = ({ children }) => {
    const trigger = useScrollTrigger({
        threshold: 100,
        disableHysteresis: true,
    });

    return React.cloneElement(children, {
        style: {
            transform: trigger ? 'translateY(0)' : 'translateY(50px)',
            opacity: trigger ? 1 : 0,
            transition: 'transform 1s ease-in-out, opacity 0.8s ease-out',
        },
    });
};

const Home = () => {
    return (
        <>
            <ElectionAppBar />

            {/* Hero Section */}
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: '#B0B0B0',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h2" gutterBottom sx={{ color: '#FFFFFF', fontFamily: 'Rajdhani, sans-serif', fontSize: 125 }}>
                    Block Surakshit Nirvachan
                </Typography>
                <Typography variant="h5" paragraph sx={{ color: '#B0B0B0', fontFamily: 'Rajdhani, sans-serif', fontSize: 35 }}>
                    The Future of Secure Voting
                </Typography>
                <Button variant="contained" size="large" component={Link} to='/details' sx={{ mt: 4, bgcolor: '#948174', fontFamily: 'Rajdhani, sans-serif' }}>
                    Learn More
                </Button>
            </Box>
            <Container maxWidth="md" sx={{ py: 6 }}>
                <ScrollAnimation>
                    <Typography variant="h3" align="center" gutterBottom sx={{ color: '#FFFFFF', fontFamily: 'Rajdhani, sans-serif', fontSize: 80 }}>
                        Welcome to Block Surakshit Nirvachan
                    </Typography>
                </ScrollAnimation>

                <ScrollAnimation>
                    <Typography variant="h5" align="center" paragraph sx={{ color: '#B0B0B0', fontFamily: 'Rajdhani, sans-serif', fontSize: 35 }}>
                        <strong>Your Vote, Reinvented</strong>
                    </Typography>
                </ScrollAnimation>

                <ScrollAnimation>
                    <Typography variant="body1" align="center" paragraph sx={{ color: '#B0B0B0', fontFamily: 'Rajdhani, sans-serif', fontSize: 20 }}>
                        Welcome to the future of elections, where your voice truly matters. Block Surakshit Nirvachan isn’t just a voting platform—it’s a revolution.
                        We’re bringing transparency, security, and convenience to the voting process, all wrapped up in a cutting-edge blockchain-powered experience.
                    </Typography>
                </ScrollAnimation>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 4 }}>
                    <ScrollAnimation>
                        <Box sx={{ textAlign: 'center', width: '23%' }}>
                            <SecurityIcon sx={{ fontSize: 60, color: '#B0B0B0' }} />
                            <Typography variant="h6" sx={{ color: '#FFFFFF', fontFamily: 'Rajdhani, sans-serif' }}>Bulletproof Security</Typography>
                            <Typography variant="body2" sx={{ color: '#B0B0B0', fontFamily: 'Rajdhani, sans-serif' }}>
                                Your vote is encrypted and securely stored on the blockchain—untouchable and unchangeable.
                            </Typography>
                        </Box>
                    </ScrollAnimation>

                    <ScrollAnimation>
                        <Box sx={{ textAlign: 'center', width: '23%' }}>
                            <VisibilityIcon sx={{ fontSize: 60, color: '#B0B0B0' }} />
                            <Typography variant="h6" sx={{ color: '#FFFFFF', fontFamily: 'Rajdhani, sans-serif' }}>See the Truth</Typography>
                            <Typography variant="body2" sx={{ color: '#B0B0B0', fontFamily: 'Rajdhani, sans-serif' }}>
                                Transparency like you’ve never seen before. Watch the election unfold in real-time.
                            </Typography>
                        </Box>
                    </ScrollAnimation>

                    <ScrollAnimation>
                        <Box sx={{ textAlign: 'center', width: '23%' }}>
                            <PublicIcon sx={{ fontSize: 60, color: '#B0B0B0' }} />
                            <Typography variant="h6" sx={{ color: '#FFFFFF', fontFamily: 'Rajdhani, sans-serif' }}>Vote from Anywhere</Typography>
                            <Typography variant="body2" sx={{ color: '#B0B0B0', fontFamily: 'Rajdhani, sans-serif' }}>
                                Wherever you are, your voice can be heard. No more standing in line.
                            </Typography>
                        </Box>
                    </ScrollAnimation>

                    <ScrollAnimation>
                        <Box sx={{ textAlign: 'center', width: '23%' }}>
                            <LockIcon sx={{ fontSize: 60, color: '#B0B0B0' }} />
                            <Typography variant="h6" sx={{ color: '#FFFFFF', fontFamily: 'Rajdhani, sans-serif' }}>Privacy Guaranteed</Typography>
                            <Typography variant="body2" sx={{ color: '#B0B0B0', fontFamily: 'Rajdhani, sans-serif' }}>
                                Your vote is anonymous and confidential. It’s your choice, and no one else’s.
                            </Typography>
                        </Box>
                    </ScrollAnimation>
                </Box>

                <ScrollAnimation>
                    <Typography variant="h5" align="center" paragraph sx={{ color: '#B0B0B0', fontFamily: 'Rajdhani, sans-serif' }}>
                        <strong>What Makes Us Different?</strong>
                    </Typography>
                </ScrollAnimation>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 4 }}>
                    <ScrollAnimation>
                        <Box sx={{ textAlign: 'center', width: '30%' }}>
                            <RocketLaunchIcon sx={{ fontSize: 60, color: '#B0B0B0' }} />
                            <Typography variant="h6" sx={{ color: '#FFFFFF', fontFamily: 'Rajdhani, sans-serif' }}>Powered by Blockchain</Typography>
                            <Typography variant="body2" sx={{ color: '#B0B0B0', fontFamily: 'Rajdhani, sans-serif' }}>
                                Our platform harnesses the decentralized power of blockchain to ensure that every vote is counted.
                            </Typography>
                        </Box>
                    </ScrollAnimation>

                    <ScrollAnimation>
                        <Box sx={{ textAlign: 'center', width: '30%' }}>
                            <CelebrationIcon sx={{ fontSize: 60, color: '#B0B0B0' }} />
                            <Typography variant="h6" sx={{ color: '#FFFFFF', fontFamily: 'Rajdhani, sans-serif' }}>Election Night Reimagined</Typography>
                            <Typography variant="body2" sx={{ color: '#B0B0B0', fontFamily: 'Rajdhani, sans-serif' }}>
                                Watch the results live, as they’re tallied right before your eyes—no more waiting.
                            </Typography>
                        </Box>
                    </ScrollAnimation>

                    <ScrollAnimation>
                        <Box sx={{ textAlign: 'center', width: '30%' }}>
                            <HowToVoteIcon sx={{ fontSize: 60, color: '#B0B0B0' }} />
                            <Typography variant="h6" sx={{ color: '#FFFFFF', fontFamily: 'Rajdhani, sans-serif' }}>Empowering Every Voter</Typography>
                            <Typography variant="body2" sx={{ color: '#B0B0B0', fontFamily: 'Rajdhani, sans-serif' }}>
                                Whether you’re a first-time voter or a seasoned participant, democracy should be easy.
                            </Typography>
                        </Box>
                    </ScrollAnimation>
                </Box>

                <ScrollAnimation>
                    <Box sx={{ textAlign: 'center', mt: 6 }}>
                        <Typography variant="h5" paragraph sx={{ color: '#B0B0B0', fontFamily: 'Rajdhani, sans-serif' }}>
                            <strong>Join the Movement</strong>
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#B0B0B0', fontFamily: 'Rajdhani, sans-serif' }}>
                            Block Surakshit Nirvachan is more than a voting platform—it’s a community of people who believe in the power of their voice.
                            Together, we’re building a better, more secure future for democracy.
                        </Typography>
                        <Button variant="contained" color="primary" size="large" component={Link} to='/register' sx={{ bgcolor: '#9A8174', fontFamily: 'Rajdhani, sans-serif' }}>
                            Ready to change the world?
                        </Button>
                    </Box>
                </ScrollAnimation>
            </Container>
        </>
    );
};

export default Home;
