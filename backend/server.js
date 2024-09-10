import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';

import normalRouter from "./router/routes.js";
import adminRouter from "./router/adminRoutes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("DataBase Connected"))
    .catch((error) => console.log(error.message));

app.use('/users', normalRouter);
app.use('/admins', adminRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})