import React, { useState } from 'react'
import { Container, Typography, TextField, Button, Paper } from '@mui/material'
import Axios from 'axios';

import ElectionAppBar from '../components/ElectionAppBar'

const RegisterPage = () => {
    const [voterData, setVoterData] = useState({
        email: '',
        firstname: '',
        middlename: '',
        lastname: '',
        age: '',
        voterId: '',
        state: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}
        if (!voterData.email) newErrors.email = 'Email is required'
        if (!voterData.firstname) newErrors.firstname = 'First Name is required'
        if (!voterData.lastname) newErrors.lastname = 'Last Name is required'
        if (!voterData.age || voterData.age <= 0) newErrors.age = 'Age must be a positive number'
        if (!voterData.voterId) newErrors.voterId = 'Voter ID is required'
        if (!voterData.state) newErrors.state = 'State is required'
        if (!voterData.password || voterData.password.length < 8) newErrors.password = 'Password must be at least 8 characters long'


        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await Axios.post('http://localhost:5000/public/addVoter', voterData);
                alert('Form Submitted Successfully');
                clear();
            } catch (error) {
                console.error(error.message)
                alert('Error submitting the form. Please try again.');
            }
        }
    }


    const clear = () => {
        setVoterData({
            email: '',
            firstname: '',
            middlename: '',
            lastname: '',
            age: '',
            voterId: '',
            state: '',
            password: ''
        })
    }

    return (
        <Container maxWidth="sm">
            <ElectionAppBar />
            <Typography
                variant='h3'
                align='center'
                sx={{
                    color: '#EEEEEE',
                    fontFamily: 'Rajdhani, sans-serif',
                    textShadow: '0px 0px 5px rgba(169, 169, 169, 0.7)',
                    mt: 13
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
                    variant='h3'
                    align='center'
                    gutterBottom
                    sx={{
                        color: '#1F1F1F',
                        fontFamily: 'Rajdhani, sans-serif',
                        textShadow: '0px 0px 5px rgba(169, 169, 169, 0.7)' // Grey text glow
                    }}
                >
                    Voter Registration
                </Typography>

                <form autoComplete='off' onSubmit={handleSubmit}>
                    <TextField
                        name='firstname'
                        variant='outlined'
                        label='First Name'
                        fullWidth
                        required
                        error={Boolean(errors.firstname)}
                        helperText={errors.firstname}
                        value={voterData.firstname}
                        onChange={(e) => setVoterData({ ...voterData, firstname: e.target.value })}
                        sx={{
                            marginBottom: 2,
                            input: { color: '#2F2F2F' },
                            label: { color: '#3C3C3C' },
                            fieldset: { borderColor: '#3C3C3C' },
                            fontFamily: 'Rajdhani, sans-serif'
                        }}
                    />
                    <TextField
                        name='middlename'
                        variant='outlined'
                        label='Middle Name'
                        fullWidth
                        value={voterData.middlename}
                        onChange={(e) => setVoterData({ ...voterData, middlename: e.target.value })}
                        sx={{
                            marginBottom: 2,
                            input: { color: '#2F2F2F' },
                            label: { color: '#3C3C3C' },
                            fieldset: { borderColor: '#3C3C3C' },
                            fontFamily: 'Rajdhani, sans-serif'
                        }}
                    />
                    <TextField
                        name='lastname'
                        variant='outlined'
                        label='Last Name'
                        fullWidth
                        required
                        error={Boolean(errors.lastname)}
                        helperText={errors.lastname}
                        value={voterData.lastname}
                        onChange={(e) => setVoterData({ ...voterData, lastname: e.target.value })}
                        sx={{
                            marginBottom: 2,
                            input: { color: '#2F2F2F' },
                            label: { color: '#3C3C3C' },
                            fieldset: { borderColor: '#3C3C3C' },
                            fontFamily: 'Rajdhani, sans-serif'
                        }}
                    />
                    <TextField
                        name='age'
                        type="number"
                        variant='outlined'
                        label='Age'
                        fullWidth
                        required
                        error={Boolean(errors.age)}
                        helperText={errors.age}
                        value={voterData.age}
                        onChange={(e) => setVoterData({ ...voterData, age: e.target.value })}
                        sx={{
                            marginBottom: 2,
                            input: { color: '#2F2F2F' },
                            label: { color: '#3C3C3C' },
                            fieldset: { borderColor: '#3C3C3C' },
                            fontFamily: 'Rajdhani, sans-serif'
                        }}
                    />
                    <TextField
                        name='email'
                        variant='outlined'
                        label='Email'
                        fullWidth
                        required
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        value={voterData.email}
                        onChange={(e) => setVoterData({ ...voterData, email: e.target.value })}
                        sx={{
                            marginBottom: 2,
                            input: { color: '#2F2F2F' },
                            label: { color: '#3C3C3C' },
                            fieldset: { borderColor: '#3C3C3C' },
                            fontFamily: 'Rajdhani, sans-serif'
                        }}
                    />
                    <TextField
                        name='password'
                        variant='outlined'
                        label='Password'
                        fullWidth
                        required
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                        value={voterData.password}
                        onChange={(e) => setVoterData({ ...voterData, password: e.target.value })}
                        sx={{
                            marginBottom: 2,
                            input: { color: '#2F2F2F' },
                            label: { color: '#3C3C3C' },
                            fieldset: { borderColor: '#3C3C3C' },
                            fontFamily: 'Rajdhani, sans-serif'
                        }}
                    />
                    <TextField
                        name='voterId'
                        variant='outlined'
                        label='Voter ID'
                        fullWidth
                        required
                        error={Boolean(errors.voterId)}
                        helperText={errors.voterId}
                        value={voterData.voterId}
                        onChange={(e) => setVoterData({ ...voterData, voterId: e.target.value })}
                        sx={{
                            marginBottom: 2,
                            input: { color: '#2F2F2F' },
                            label: { color: '#3C3C3C' },
                            fieldset: { borderColor: '#3C3C3C' },
                            fontFamily: 'Rajdhani, sans-serif'
                        }}
                    />
                    <TextField
                        name='state'
                        variant='outlined'
                        label='State'
                        fullWidth
                        required
                        error={Boolean(errors.state)}
                        helperText={errors.state}
                        value={voterData.state}
                        onChange={(e) => setVoterData({ ...voterData, state: e.target.value })}
                        sx={{
                            marginBottom: 3,
                            input: { color: '#2F2F2F' },
                            label: { color: '#3C3C3C' },
                            fieldset: { borderColor: '#3C3C3C' },
                            fontFamily: 'Rajdhani, sans-serif'
                        }}
                    />

                    <Button
                        type='submit'
                        variant='contained'
                        fullWidth
                        sx={{
                            backgroundColor: '#9A8174',
                            color: '#2F2F2F',
                            fontFamily: 'Rajdhani, sans-serif',
                            '&:hover': {
                                backgroundColor: '#876A60'
                            }
                        }}
                    >
                        Register
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default RegisterPage
