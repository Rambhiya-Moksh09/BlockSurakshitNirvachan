import express from 'express';

import { addVoterDetails, loginUser, logoutUser, showVoterDetail } from '../controller/voters/voterData.js';
import { getStatus, addVote } from '../controller/voters/voterData.js';

const normalRouter = express.Router();



//Voter routes
normalRouter.post('/addVoter', addVoterDetails)
normalRouter.get('/getVoters', showVoterDetail)
normalRouter.post('/login', loginUser)
normalRouter.post('/logout', logoutUser)
normalRouter.get('/getstatus', getStatus)
normalRouter.post('/vote', addVote)


export default normalRouter;