import argon2 from 'argon2';

import { ElectionContract, web3 } from "../../web3.js"
import admins from "../../models/admins.js";


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

export const addNewAdmin = async (req, res) => {
    try {
        const { email, password, firstname, middlename, lastname, age, accountAddress } = req.body;
        if (!web3.utils.isAddress(accountAddress)) {
            return res.status(400).send("Invalid Ethereum Address")
        }
        const hashedPassword = await hashPassword(password);

        const admin = new admins({ email, hashedPassword, firstname, middlename, lastname, age, accountAddress })

        const addr = await web3.eth.getAccounts();
        const tx = await ElectionContract.methods.addAdmin(accountAddress).send({ from: addr[0], gas: 5000000 })

        const txData = JSON.parse(JSON.stringify(tx, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        await admin.save();
        res.status(201).json({ msg: 'Admin added successfully', txData })

    } catch (error) {
        res.status(500).json({ msg: 'Error adding admin', error })
    }

}

export const getAllAdmins = async (req, res) => {
    try {
        const tx = await ElectionContract.methods.getAdmins().call();
        res.status(200).json({ tx })
    } catch (error) {
        res.status(500).json({ msg: 'Error retriveing admins', error })
    }
}