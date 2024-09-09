import mongoose from "mongoose";

const voterSchema = new mongoose.Schema({
    email: {
        type: String, required: true, unique: true
    },
    hashedPassword:
        { type: String, required: true },
    firstname:
        { type: String, required: true },
    middlename:
        { type: String },
    lastname:
        { type: String, required: true },
    age:
        { type: Number, required: true },
    voterId:
        { type: String, required: true, unique: true },
    state:
        { type: String, required: true },
    token:
        { type: String }
});


const Voter = mongoose.model('Voter', voterSchema);
export default Voter;