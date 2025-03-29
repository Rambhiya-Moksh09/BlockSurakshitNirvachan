import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, Paper, Grid, Box } from "@mui/material";
import axios from "axios";
import AdminAppBar from "../components/AdminAppBar";

const AdminPanel = () => {
    const [candidates, setCandidates] = useState([]);
    const [newCandidate, setNewCandidate] = useState({
        name: "",
        age: "",
        info: "",
        qualification: "",
    });

    const [electionData, setElectionData] = useState({
        name: "",
        description: "",
    });

    const [electionStatus, setElectionStatus] = useState("Not Started");
    const [loading, setLoading] = useState(true);

    // ✅ Fetch candidates from API (Same as ElectionPage)
    useEffect(() => {
        axios.get("http://localhost:5000/admins/getCandidates")
            .then(response => {
                if (response.data && response.data.candidate) {
                    setCandidates(response.data.candidate);
                } else if (Array.isArray(response.data)) {
                    setCandidates(response.data);
                } else {
                    console.error("Unexpected API response format for candidates");
                }
            })
            .catch(error => console.error("Error fetching candidates:", error))
            .finally(() => setLoading(false));
    }, []);

    // ✅ API Call to Add Candidate
    const addCandidate = async () => {
        if (!newCandidate.name.trim()) return;
        try {
            const response = await axios.post("http://localhost:5000/admins/addCandidate", newCandidate);
            setCandidates([...candidates, response.data]); // Add new candidate to state
            setNewCandidate({ name: "", age: "", information: "", qualification: "" });
            alert('Candidate Added ')
        } catch (error) {
            console.error("Error adding candidate:", error);
        }
    };

    // ✅ API Call to Set Election Details
    const setElectionDetails = async () => {
        if (!electionData.name.trim() || !electionData.description.trim()) return;
        try {
            await axios.post("http://localhost:5000/admins/setElectionDetails", electionData);
            alert("Election details set successfully!");
            setElectionData({ name: "", description: "" });
        } catch (error) {
            console.error("Error setting election details:", error);
        }
    };

    // ✅ API Call to Get Election Status
    const fetchElectionStatus = async () => {
        try {
            const response = await axios.get("http://localhost:5000/users/getStatus");
            alert(`The Election is: ${response.data}`);
        } catch (error) {
            console.error("Error fetching election status:", error);
        }
    };

    // ✅ API Call to End Election
    const handleEndElection = async () => {
        try {
            await axios.post("http://localhost:5000/admins/endElection");
            alert("The election has ended");
        } catch (error) {
            console.error("Error ending election:", error);
        }
    };
    const handleResetElection = async () => {
        try {
            await axios.post("http://localhost:5000/admins/resetElection")
            alert('Election has reseted')
        } catch (error) {
            console.log(error)
            alert('Election has not reseted')
        }
    }

    return (
        <Box sx={{ padding: 3, minHeight: "100vh", backgroundColor: "#000000" }}>  {/* BLACK Background */}
            <AdminAppBar />
            <Grid container spacing={3} sx={{ marginTop: 10 }}>

                {/* Set Election */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, backgroundColor: "#B4B4B4" }}>
                        <Typography variant="h5" sx={{ color: "#1F1F1F", fontFamily: "Rajdhani, sans-serif" }}>
                            Set Election
                        </Typography>
                        <TextField
                            label="Election Name"
                            variant="outlined"
                            fullWidth
                            required
                            value={electionData.name}
                            onChange={(e) => setElectionData({ ...electionData, name: e.target.value })}
                            sx={{ marginBottom: 2, input: { color: "#2F2F2F" } }}
                        />
                        <TextField
                            label="Election Description"
                            variant="outlined"
                            fullWidth
                            required
                            value={electionData.description}
                            onChange={(e) => setElectionData({ ...electionData, description: e.target.value })}
                            sx={{ marginBottom: 2, input: { color: "#2F2F2F" } }}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: "#9A8174",
                                color: "#2F2F2F",
                                fontFamily: "Rajdhani, sans-serif",
                                "&:hover": { backgroundColor: "#876A60" },
                            }}
                            onClick={setElectionDetails}
                        >
                            Set Election
                        </Button>
                    </Paper>
                </Grid>

                {/* Add Candidate */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, backgroundColor: "#B4B4B4" }}>
                        <Typography variant="h5" sx={{ color: "#1F1F1F", fontFamily: "Rajdhani, sans-serif" }}>
                            Add Candidate
                        </Typography>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={newCandidate.name}
                            onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Age"
                            variant="outlined"
                            fullWidth
                            value={newCandidate.age}
                            onChange={(e) => setNewCandidate({ ...newCandidate, age: e.target.value })}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Information"
                            variant="outlined"
                            fullWidth
                            value={newCandidate.info}
                            onChange={(e) => setNewCandidate({ ...newCandidate, info: e.target.value })}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Qualification"
                            variant="outlined"
                            fullWidth
                            value={newCandidate.qualification}
                            onChange={(e) => setNewCandidate({ ...newCandidate, qualification: e.target.value })}
                            sx={{ marginBottom: 2 }}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: "#9A8174",
                                color: "#2F2F2F",
                                fontFamily: "Rajdhani, sans-serif",
                                "&:hover": { backgroundColor: "#876A60" },
                            }}
                            onClick={addCandidate}
                        >
                            Add Candidate
                        </Button>
                    </Paper>
                </Grid>

                {/* ✅ Candidate List (Now Displaying Existing Candidates) */}
                <Grid item xs={12} md={8} sx={{ margin: "auto", mt: 3 }}>
                    <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, backgroundColor: "#D9D9D9" }}>
                        <Typography variant="h4" align="center" sx={{ color: "#1F1F1F", fontFamily: "Rajdhani, sans-serif" }}>
                            Candidate List
                        </Typography>
                        {loading ? (
                            <Typography sx={{ color: "#777" }}>Loading candidates...</Typography>
                        ) : candidates.length > 0 ? (
                            candidates.map((candidate) => (
                                <Typography key={candidate._id} sx={{ marginTop: 1, color: "#555" }}>
                                    🗳 {candidate.name} (Age: {candidate.age}, Qualification: {candidate.qualification})
                                </Typography>
                            ))
                        ) : (
                            <Typography sx={{ color: "#777" }}>No candidates added yet.</Typography>
                        )}
                    </Paper>
                </Grid>

                {/* Election Status & End Results Buttons */}
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 5 }}>
                    <Button onClick={fetchElectionStatus}>Get Election Status</Button>
                    <Button onClick={handleEndElection}>End Election</Button>
                    <Button onClick={handleResetElection}>Result Election</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminPanel;
