import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js"

connectDB();

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