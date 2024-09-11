import React, { useState, useContext } from 'react';
import { Typography, Paper, Container, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ElectionAppBar from '../components/ElectionAppBar.jsx';
import { AuthContext } from '../utils/AuthContext.js';

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [errors, setErrors] = useState({ email: '', password: '' });

    const validateForm = () => {
        let formValid = true;
        let newErrors = { email: '', password: '' };

        if (!loginData.email) {
            newErrors.email = 'Email is required';
            formValid = false;
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            newErrors.email = 'Please enter a valid email address';
            formValid = false;
        }

        if (!loginData.password) {
            newErrors.password = 'Password is required';
            formValid = false;
        } else if (loginData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            formValid = false;
        }

        setErrors(newErrors);
        return formValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.post('http://localhost:5000/public/login', loginData, {
                    withCredentials: true
                })
                clear();
                alert('Login Successful');
                login();
                navigate('/');

            } catch (error) {
                alert('Login failed');
            }
        }
    };


    const clear = () => {
        setLoginData({
            email: '',
            password: '',
        });
        setErrors({
            email: '',
            password: '',
        });
    };

    return (
        <Container maxWidth="sm">
            <ElectionAppBar />
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
                Welcome to Registration
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
                    Voter Login
                </Typography>

                <form autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        fullWidth
                        required
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        sx={{
                            marginBottom: 2,
                            input: { color: '#2F2F2F' },
                            label: { color: '#3C3C3C' },
                            fieldset: { borderColor: '#3C3C3C' },
                            fontFamily: 'Rajdhani, sans-serif',
                        }}
                    />
                    <TextField
                        name="password"
                        variant="outlined"
                        label="Password"
                        type="password"
                        required
                        fullWidth
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
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
                        Login
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default LoginPage;
