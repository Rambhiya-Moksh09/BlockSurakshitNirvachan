import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Container, Typography, Paper, CircularProgress } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Results = () => {
    const [candidates, setCandidates] = useState([]);
    const [voteCounts, setVoteCounts] = useState({});
    const [totalVotes, setTotalVotes] = useState(0);
    const [winner, setWinner] = useState(null);
    const [electionStatus, setElectionStatus] = useState('not-started');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                // Fetch election status
                const statusResponse = await Axios.get('http://localhost:5000/users/getStatus');
                setElectionStatus(statusResponse.data);

                // Only fetch results if the election has ended
                if (statusResponse.data === 'finished') {
                    const candidatesResponse = await Axios.get('http://localhost:5000/admins/getCandidates');
                    const votesResponse = await Axios.get('http://localhost:5000/admins/getAllVotes');

                    const candidateList = candidatesResponse.data.candidate;
                    const votes = votesResponse.data;
                    const voteTally = {};
                    let total = 0;

                    // Initialize all candidates with zero votes
                    candidateList.forEach(candidate => {
                        voteTally[candidate.name] = 0;
                    });

                    // Count the votes
                    votes.forEach(vote => {
                        if (voteTally[vote.candidate] !== undefined) {
                            voteTally[vote.candidate]++;
                        }
                        total++;
                    });

                    // Determine the winner
                    const sortedCandidates = Object.entries(voteTally).sort((a, b) => b[1] - a[1]);
                    setWinner(sortedCandidates[0]);

                    setCandidates(candidateList);
                    setVoteCounts(voteTally);
                    setTotalVotes(total);
                }
            } catch (error) {
                console.error('Error fetching results:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    if (loading) {
        return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 5 }} />;
    }

    if (electionStatus !== 'finished') {
        return (
            <Typography variant='h5' align='center' sx={{ mt: 5, color: '#FF5733' }}>
                Election is still ongoing or not started. Results will be available once the election has ended.
            </Typography>
        );
    }

    const chartData = {
        labels: candidates.map(candidate => candidate.name),
        datasets: [{
            label: 'Votes',
            data: candidates.map(candidate => voteCounts[candidate.name] || 0),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }]
    };

    return (
        <Container maxWidth='md'>
            <Typography variant='h3' align='center' sx={{ mt: 5, mb: 3, fontFamily: 'Rajdhani, sans-serif' }}>
                Election Results
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </Paper>
            <Paper sx={{ p: 3, mt: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant='h5' align='center'>
                    Total Votes Cast: {totalVotes}
                </Typography>
                {winner && (
                    <Typography variant='h5' align='center' sx={{ mt: 2, fontWeight: 'bold' }}>
                        Winner: {winner[0]} with {winner[1]} votes
                    </Typography>
                )}
            </Paper>
        </Container>
    );
};

export default Results;
