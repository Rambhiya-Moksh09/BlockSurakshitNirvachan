import express from 'express';

import { addNewAdmin, getAllAdmins } from '../controller/Admins/Admins.js'
import { addNewCandidate, getAllCandidates } from '../controller/candidate/candidates.js';
import { addVote, endElection, getDetails, getStatus, getVotes, resetElection, setDetails } from '../controller/Election Management/management.js';

const adminRouter = express.Router();

adminRouter.post('/addAdmin', addNewAdmin)
adminRouter.get('/getAdmins', getAllAdmins)


//candidate routes
adminRouter.post('/addCandidate', addNewCandidate)
adminRouter.get('/getCandidates', getAllCandidates)



//management routes
adminRouter.post('/setElectionDetails', setDetails)
adminRouter.get('/getElectionDetails', getDetails)
adminRouter.get('/getAllVotes', getVotes)
adminRouter.post('/endElection', endElection)
adminRouter.post('/resetElection', resetElection)
adminRouter.get('/getStatus', getStatus)
adminRouter.post('/vote', addVote)

export default adminRouter;