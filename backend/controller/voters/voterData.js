import crypto from 'crypto'
import argon2 from 'argon2';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import Voter from "../../models/voter.js";
import { ElectionContract, web3 } from '../../web3.js';;
dotenv.config();
const hashPassword = async (plainPassword) => {
    try {
        // Hash the password using Argon2
        const hashedPassword = await argon2.hash(plainPassword);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Error hashing password');
    }
};


export const addVoterDetails = async (req, res) => {
    try {
        const { email, password, firstname, middlename, lastname, age, voterId, state } = req.body;
        const token = crypto.randomBytes(32).toString('hex');
        const hashedPassword = await hashPassword(password);

        const voter = new Voter({ email, hashedPassword, firstname, middlename, lastname, age, voterId, state, token });
        await voter.save();

        res.status(201).send({ message: 'Data Saved successfully', id: voter._id });
    } catch (error) {
        res.status(400).send({ message: 'Error saving data', error: error.message });
    }
}

export const showVoterDetail = async (req, res) => {
    try {
        const voterDetails = await Voter.find();
        res.status(200).json(voterDetails)
    } catch (error) {
        res.status(400).send({ message: 'Error retriveing data', error: error.message });
    }
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Voter.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        if (!user.hashedPassword || typeof user.hashedPassword !== 'string') {
            return res.status(500).json({ message: 'Server error: invalid password stored' });
        }

        const validPassword = await argon2.verify(user.hashedPassword, password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Prepare the JWT payload
        const payload = {
            id: user._id,
            email: user.email,
            voterid: user.voterId
        };

        // Generate JWT token with a 1-hour expiration time
        const uid = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.cookie('jwtToken', uid, {
            httpOnly: true,
            sameSite: 'Strict'
        });

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                voterId: user.voterId
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const logoutUser = (req, res) => {
    try {
        res.clearCookie('jwtToken', {
            httpOnly: true,
            sameSite: 'Strict'
        });
        return res.status(200).json({ message: 'Logged Out Successfully' })

    } catch (error) {
        res.status(400).json({ error })
    }
}


export const getStatus = async (req, res) => {
    try {

        const tx = await ElectionContract.methods.getStatus().call()
        const txData = JSON.parse(JSON.stringify(tx, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        res.status(200).json(txData)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

export const addVote = async (req, res) => {
    try {
        const { candidateName } = req.body;
        if (!candidateName) {
            return res.status(400).send({ error: 'Candidate name is required' });
        }

        // Check if JWT token exists in cookies
        const cookieValue = await req.cookies.jwtToken;
        if (!cookieValue) {
            return res.status(400).send({ error: 'Authentication token not found' });
        }

        const decodedToken = decodeJwtToken(cookieValue)
        const vId = decodedToken.voterid;

        if (!vId) {
            return res.status(404).send({ error: 'Voter record not found' });
        }

        // Send the vote transaction to the blockchain
        const tx = await ElectionContract.methods.vote(vId, candidateName).send({ from: accounts[0] });

        // Convert transaction object to a serializable format
        const txData = JSON.parse(JSON.stringify(tx, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        res.send({ message: 'Vote cast successfully', transaction: txData });
    } catch (error) {
        res.status(500).send({ error: 'Voting failed', details: error });
    }
};
const decodeJwtToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
};
