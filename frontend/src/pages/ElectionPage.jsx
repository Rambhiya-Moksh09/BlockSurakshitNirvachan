import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Container, Typography, CardActions, Button, Grid2 } from '@mui/material';

import ElectionAppBar from '../components/ElectionAppBar.jsx';
import image from '../Election.jpg';

const ElectionPage = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/admins/getCandidates')
            .then(response => {
                if (response.data && response.data.candidate) {
                    setCandidates(response.data.candidate);
                } else if (Array.isArray(response.data)) {
                    setCandidates(response.data);
                } else {
                    console.error('Unexpected API response format');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
    }, []);

    const handleClick = async (candidateName) => {
        try {
            await axios.post('http://localhost:5000/users/vote', { candidateName })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container sx={{ my: 15, mx: 'auto', px: 1 }}>
            <ElectionAppBar />
            <Grid2 container spacing={3} justifyContent={'space-evenly'}>
                {candidates.length > 0 ? (
                    candidates.map((candidate) => (
                        <Grid2 item key={candidate._id} xs={12} sm={6} md={4}>
                            <Card sx={{
                                bgcolor: "#1F1F1F",
                                height: 425,
                                width: 325,  // Adjust to full width within the grid item
                                color: '#B4B4B4',
                                borderRadius: 3,
                                boxShadow: '0px 0px 15px rgba(169, 169, 169, 0.5), 0px 0px 30px rgba(169, 169, 169, 0.3)'
                            }}>

                                <CardMedia
                                    component="img"
                                    height="175"
                                    image={image}
                                    alt={candidate.name}
                                    title={candidate.name}
                                />
                                <CardContent sx={{ padding: 2 }}>
                                    <Typography variant="h4" sx={{ fontFamily: 'Rajdhani, sans-serif', color: '#FFFFFF' }}>
                                        {candidate.name}
                                    </Typography>

                                    <Typography variant="body1" sx={{ fontFamily: 'Rajdhani, sans-serif', color: '#B4B4B4', mt: 1 }}>
                                        Info: {candidate.info}
                                    </Typography>

                                    <Typography variant="body1" sx={{ fontFamily: 'Rajdhani, sans-serif', color: '#B4B4B4', mt: 1 }}>
                                        Age: {candidate.age}
                                    </Typography>

                                    <Typography variant="body1" sx={{ fontFamily: 'Rajdhani, sans-serif', color: '#B4B4B4', mt: 1 }}>
                                        Qualification: {candidate.qualification}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="large" variant="contained" sx={{
                                        bgcolor: '#9A8174',
                                        color: '#2F2F2F',
                                        ml: 1,
                                        mb: 1.5,
                                        '&:hover': {
                                            backgroundColor: '#876A60',
                                        },
                                    }} onClick={() => handleClick(candidate.name)}>
                                        Vote
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid2>
                    ))
                ) : (
                    <Typography variant="h6" color="error">
                        No candidates found.
                    </Typography>
                )}
            </Grid2>
        </Container>
    );
}

export default ElectionPage;
