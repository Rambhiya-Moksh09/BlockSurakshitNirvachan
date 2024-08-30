import express from 'express';
import { addVoterDetails, showVoterDetail } from '../controller/voterData.js';

const router = express.Router();

router.post('/addVoter', addVoterDetails)
router.get('/getVoter', showVoterDetail)


export default router;