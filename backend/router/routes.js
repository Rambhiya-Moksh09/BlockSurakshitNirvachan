import express from 'express';

import { addNewAdmin, getAllAdmins } from '../controller/Admins/Admins.js'
import { addVoterDetails, showVoterDetail } from '../controller/voters/voterData.js';

const router = express.Router();


//Admin routes
router.post('/addAdmin', addNewAdmin)
router.get('/getAdmins', getAllAdmins)

//Voter routes
router.post('/addVoter', addVoterDetails)
router.get('/getVoters', showVoterDetail)

export default router;