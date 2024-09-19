import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();
const url = process.env.MONGODB_URI;

if (!url) {
    logger.error('❌ MongoDB connection string is not defined in the .env file');
    // console.error('❌ MongoDB connection string is not defined in the .env file');
    process.exit(1);
}

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(url);
        logger.info('✅ Connected to MongoDB');
        // console.log('✅ Connected to MongoDB');
    } catch (err) {
        logger.error('❌ Failed to connect to MongoDB', err);
        // console.error('❌ Failed to connect to MongoDB', err);
        process.exit(1);
    }
};
