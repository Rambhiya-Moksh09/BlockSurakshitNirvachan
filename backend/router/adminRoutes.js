import express from 'express';

import { addNewAdmin, getAllAdmins, loginAdmin, logoutAdmin } from '../controller/Admins/Admins.js'
import { addNewCandidate, getAllCandidates } from '../controller/candidate/candidates.js';
import { endElection, getDetails, getVotes, resetElection, setDetails } from '../controller/Election Management/management.js';

const adminRouter = express.Router();

adminRouter.post('/addAdmin', addNewAdmin)
adminRouter.get('/getAdmins', getAllAdmins)
adminRouter.post('/adminLogin', loginAdmin)
adminRouter.post('/adminLogout', logoutAdmin)

//candidate routes
adminRouter.post('/addCandidate', addNewCandidate)
adminRouter.get('/getCandidates', getAllCandidates)

//management routes
adminRouter.post('/setElectionDetails', setDetails)
adminRouter.get('/getElectionDetails', getDetails)
adminRouter.get('/getAllVotes', getVotes)
adminRouter.post('/endElection', endElection)
adminRouter.post('/resetElection', resetElection)

export default adminRouter;