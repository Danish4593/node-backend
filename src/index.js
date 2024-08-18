import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import {app} from './app.js'


dotenv.config({
    path: './.env'
})

connectDB().then(() => {
    app.on("error", (error) => {
        console.log("ERROR", error)
        throw err
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Serve is running at ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log('MONGO DB connection failed !!!', error);
})

/*
import express from "express";
const app = express();

( async () => {
    try {
        await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`)
        app.on('errorr', (error) => {
            console.log('errorerror=>',error)
            throw err
        })
        app.listen(process.env.PORT, () => {
            console.log('application listening on', process.env.PORT)
        })
    } catch (error) {
        console.error('error', error)
        throw error
    }
})()
    */