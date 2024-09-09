import crypto from 'crypto'
import argon2 from 'argon2';

import Voter from "../../models/voter.js";


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