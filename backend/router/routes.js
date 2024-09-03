import express from 'express';

import { addNewAdmin, getAllAdmins } from '../controller/Admins/Admins.js'
import { addVoterDetails, showVoterDetail } from '../controller/voters/voterData.js';
import { addNewCandidate, getAllCandidates } from '../controller/candidate/candidates.js';
import { addVote, endElection, getDetails, getStatus, getVotes, resetElection, setDetails } from '../controller/Election Management/management.js';

const router = express.Router();


//Admin routes
router.post('/addAdmin', addNewAdmin)
router.get('/getAdmins', getAllAdmins)

//Voter routes
router.post('/addVoter', addVoterDetails)
router.get('/getVoters', showVoterDetail)

//candidate routes
router.post('/addCandidate', addNewCandidate)
router.get('/getCandidates', getAllCandidates)

//management routes
router.post('/setElectionDetails', setDetails)
router.get('/getElectionDetails', getDetails)
router.get('/getAllVotes', getVotes)
router.post('/endElection', endElection)
router.post('/resetElection', resetElection)
router.get('/getStatus', getStatus)
router.post('/vote', addVote)
export default router;