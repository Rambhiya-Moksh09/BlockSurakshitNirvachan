import express from 'express';

import { showVoterDetail } from '../controller/voters/voterData.js';
import { getStatus, addVote } from '../controller/voters/voterData.js';

const normalRouter = express.Router();



//Voter routes

normalRouter.get('/getVoters', showVoterDetail)
normalRouter.get('/getstatus', getStatus)
normalRouter.post('/vote', addVote)


export default normalRouter;