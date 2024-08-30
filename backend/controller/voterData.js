import Voter from "../models/voter.js";

export const addVoter = async(req,res)=>{
    try {
    const voter = new Voter (req.body);
    const savedVoter = await voter.save();
    res.status(201).send({ message: 'Data Saved successfully', id: savedVoter._id });
    } catch(error){
        res.status(400).send({ message: 'Error saving data', error: error.message });
    }
}