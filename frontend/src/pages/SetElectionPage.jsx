import React, { useState } from 'react';
import { Typography, Paper, Container, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminAppBar from '../components/AdminAppBar';

const SetElectionPage = () => {
    const [electionData, setElectionData] = useState({
        name: '',
        description: '',
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({ name: '', description: '' });

    const validateForm = () => {
        let formValid = true;
        let newErrors = { name: '', description: '' };

        if (!electionData.name) {
            newErrors.name = 'Election name is required';
            formValid = false;
        }

        if (!electionData.description) {
            newErrors.description = 'Election description is required';
            formValid = false;
        }

        setErrors(newErrors);
        return formValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.post('http://localhost:5000/admins/setElectionDetails', electionData, {
                    withCredentials: true
                });
                clear();
                alert('Election details set successfully');
                navigate('/admincontrols');
            } catch (error) {
                alert('Failed to set election details');
            }
        }
    };

    const clear = () => {
        setElectionData({
            name: '',
            description: '',
        });
        setErrors({
            name: '',
            description: '',
        });
    };

    return (
        <Container maxWidth="sm">
            <AdminAppBar />
            <Typography
                variant="h3"
                align="center"
                sx={{
                    color: '#EEEEEE',
                    fontFamily: 'Rajdhani, sans-serif',
                    textShadow: '0px 0px 5px rgba(169, 169, 169, 0.7)',
                    mt: 13,
                }}
            >
                Set Election Details
            </Typography>
            <Paper
                sx={{
                    backgroundColor: '#B4B4B4',
                    padding: 4,
                    borderRadius: 2,
                    mt: 1,
                    boxShadow: '0px 0px 15px rgba(169, 169, 169, 0.5), 0px 0px 30px rgba(169, 169, 169, 0.3)', // Grey glow
                }}
            >
                <Typography
                    variant="h3"
                    align="center"
                    gutterBottom
                    sx={{
                        color: '#1F1F1F',
                        fontFamily: 'Rajdhani, sans-serif',
                        textShadow: '0px 0px 5px rgba(169, 169, 169, 0.7)', // Grey text glow
                    }}
                >
                    ELECTION
                </Typography>

                <form autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        name="name"
                        variant="outlined"
                        label="Election Name"
                        fullWidth
                        required
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                        value={electionData.name}
                        onChange={(e) => setElectionData({ ...electionData, name: e.target.value })}
                        sx={{
                            marginBottom: 2,
                            input: { color: '#2F2F2F' },
                            label: { color: '#3C3C3C' },
                            fieldset: { borderColor: '#3C3C3C' },
                            fontFamily: 'Rajdhani, sans-serif',
                        }}
                    />
                    <TextField
                        name="description"
                        variant="outlined"
                        label="Election Description"
                        required
                        fullWidth
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                        value={electionData.description}
                        onChange={(e) => setElectionData({ ...electionData, description: e.target.value })}
                        sx={{
                            marginBottom: 2,
                            input: { color: '#2F2F2F' },
                            label: { color: '#3C3C3C' },
                            fieldset: { borderColor: '#3C3C3C' },
                            fontFamily: 'Rajdhani, sans-serif',
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: '#9A8174',
                            color: '#2F2F2F',
                            fontFamily: 'Rajdhani, sans-serif',
                            '&:hover': {
                                backgroundColor: '#876A60',
                            },
                        }}
                    >
                        Set Election
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default SetElectionPage;
