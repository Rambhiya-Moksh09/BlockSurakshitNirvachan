import Candidates from "../../models/candidate.js";
import { ElectionContract, web3 } from '../../web3.js'

export const addNewCandidate = async (req, res) => {
    const { name, info, age, qualification, photo } = req.body;
    const candidate = new Candidates({ name, info, age, qualification, photo })
    try {
        await candidate.save();

        const accounts = await web3.eth.getAccounts();
        const tx = await ElectionContract.methods.addCandidate(name, info).send({ from: accounts[0], gas: 5000000 })
        const txData = JSON.parse(JSON.stringify(tx, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        res.status(200).send({ msg: 'Candidate added', txData })
    }
    catch (error) {
        res.status(500).send({ msg: 'Error adding candidate', error: error.message });
    }
}

export const getAllCandidates = async (req, res) => {

    try {
        const candidate = await Candidates.find();
        const blockdata = await ElectionContract.methods.getCandidates().call();

        res.status(200).json({ candidate })

    } catch (error) {
        res.status(500).send({ message: 'Data not retrieved', error: error.message })
    }

}