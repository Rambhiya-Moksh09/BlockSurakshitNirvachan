import mongoose from 'mongoose';

const candidateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: [30, 'Minimun Age requirement is 30'],
    },
    info: {
        type: String,
        required: true,
        trim: true
    },
    qualification: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Candidates = mongoose.model('Candidates', candidateSchema);
export default Candidates;