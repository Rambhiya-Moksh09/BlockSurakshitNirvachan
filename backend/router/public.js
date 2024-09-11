import express from 'express';

import { addVoterDetails, loginUser, logoutUser } from '../controller/voters/voterData.js'

const publicRouter = express.Router();

publicRouter.post('/addVoter', addVoterDetails)
publicRouter.post('/login', loginUser)
publicRouter.post('/logout', logoutUser)

export default publicRouter;