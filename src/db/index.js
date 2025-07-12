import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
  try {
    const dbConnect = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log('/n✅ Connected to MongoDB Atlas! DB-HOST',dbConnect.connection.host);
    
  } catch (error) {
    console.log('❌ Faield connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB