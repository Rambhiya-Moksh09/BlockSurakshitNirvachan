import mongoose from "mongoose";

const VoterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    voterId:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
})

const Voter = mongoose.model('Voter',VoterSchema);
export default Voter;