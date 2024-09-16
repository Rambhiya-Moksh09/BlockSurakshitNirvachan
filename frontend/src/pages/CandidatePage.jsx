import React, { useState } from 'react'
import Axios from 'axios';
import { Container, Typography, Paper, TextField, Button } from '@mui/material';

import AdminAppBar from '../components/AdminAppBar.jsx';
const CandidatePage = () => {
    const [candidate, setCandidate] = useState({
        name: '',
        age: '',
        info: '',
        qualification: '',
        image: ''
    })

    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}
        if (!candidate.name) newErrors.name = ' Name is required'
        if (!candidate.age || candidate.age <= 0) newErrors.age = 'Age must be a positive number'
        if (!candidate.info) newErrors.info = 'Information is required'
        if (!candidate.qualification) newErrors.qualification = 'State is required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await Axios.post('http://localhost:5000/admins/addCandidate', candidate);
                alert('Candidate Added Successfully');
                clear();
            } catch (error) {
                console.error(error.message)
                alert('Error submitting the form. Please try again.');
            }
        }
    }


    const clear = () => {
        setCandidate({
            name: '',
            age: '',
            info: '',
            qualification: '',
            image: ''
        })
    }

    return (
        <>

            <Container maxWidth="sm">
                <AdminAppBar />
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
                        Add Candidate
                    </Typography>

                    <form autoComplete='off' onSubmit={handleSubmit}>
                        <TextField
                            name='name'
                            variant='outlined'
                            label='Name'
                            fullWidth
                            required
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                            value={candidate.name}
                            onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
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
                            value={candidate.age}
                            onChange={(e) => setCandidate({ ...candidate, age: e.target.value })}
                            sx={{
                                marginBottom: 2,
                                input: { color: '#2F2F2F' },
                                label: { color: '#3C3C3C' },
                                fieldset: { borderColor: '#3C3C3C' },
                                fontFamily: 'Rajdhani, sans-serif'
                            }}
                        />
                        <TextField
                            name='info'
                            variant='outlined'
                            label='Information'
                            fullWidth
                            required
                            error={Boolean(errors.info)}
                            helperText={errors.info}
                            value={candidate.info}
                            onChange={(e) => setCandidate({ ...candidate, info: e.target.value })}
                            sx={{
                                marginBottom: 2,
                                input: { color: '#2F2F2F' },
                                label: { color: '#3C3C3C' },
                                fieldset: { borderColor: '#3C3C3C' },
                                fontFamily: 'Rajdhani, sans-serif'
                            }}
                        />
                        <TextField
                            name='qualification'
                            variant='outlined'
                            label='Qualification'
                            fullWidth
                            required
                            error={Boolean(errors.qualification)}
                            helperText={errors.qualification}
                            value={candidate.qualification}
                            onChange={(e) => setCandidate({ ...candidate, qualification: e.target.value })}
                            sx={{
                                marginBottom: 2,
                                input: { color: '#2F2F2F' },
                                label: { color: '#3C3C3C' },
                                fieldset: { borderColor: '#3C3C3C' },
                                fontFamily: 'Rajdhani, sans-serif'
                            }}
                        />
                        <TextField
                            name='image'
                            variant='outlined'
                            label='Image'
                            fullWidth
                            error={Boolean(errors.image)}
                            helperText={errors.image}
                            value={candidate.image} // corrected here
                            onChange={(e) => setCandidate({ ...candidate, image: e.target.value })} // corrected here
                            sx={{
                                marginBottom: 2,
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
                            Register Candidate
                        </Button>
                    </form>
                </Paper>
            </Container>
        </>
    );
}
export default CandidatePage