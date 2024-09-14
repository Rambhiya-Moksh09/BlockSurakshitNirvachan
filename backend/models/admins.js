import mongoose from "mongoose";

const adminsSchema = mongoose.Schema({
    email: {
        type: String, required: true, unique: true
    },
    hashedPassword: {
        type: String,
        required: true
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
    accountAddress: {
        type: String,
        required: true,
        unique: true
    }
})


const admins = mongoose.model('Admins', adminsSchema);

export default admins;