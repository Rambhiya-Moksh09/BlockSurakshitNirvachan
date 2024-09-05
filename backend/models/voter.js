import mongoose from "mongoose";

const VoterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    voterId: {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true
    }
})

const Voter = mongoose.model('Voter', VoterSchema);
export default Voter;