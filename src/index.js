import connectDB from "./db/index.js";
import  dotenv  from 'dotenv'

dotenv.config({
    path:'./env'
})

connectDB()































/*
import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config(); // to load .env file

const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log('✅ Connected to MongoDB Atlas!');

    app.on('Express Error', (err) => {
      console.log(`Express Err`, err);
      throw err;
    });
    app.listen(process.env.PORT, () => {
      console.log(`🚀 App is running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.log('❌ ERROR connecting to MongoDB:', error);
    throw error;
  }
})(); //iife approch emmideat exexcute
*/