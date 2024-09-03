import Voter from "../../models/voter.js";

export const addVoterDetails = async (req, res) => {
    try {
        const voter = new Voter(req.body);
        /*const savedVoter =*/ await voter.save();
        res.status(201).send({ message: 'Data Saved successfully', /*id: savedVoter._id */ });
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