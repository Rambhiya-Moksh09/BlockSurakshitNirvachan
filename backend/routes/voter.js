import express from 'express';
import { addVoter } from '../controller/voterData.js';

const router = express.Router();

router.post('/addVoter', addVoter)


export default router;