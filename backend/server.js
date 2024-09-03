import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import router from "./router/routes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("DataBase Connected"))
    .catch((error) => console.log(error.message));

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})