"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../utils/logger"));
dotenv_1.default.config();
const url = process.env.MONGODB_URI;
if (!url) {
    logger_1.default.error('❌ MongoDB connection string is not defined in the .env file');
    // console.error('❌ MongoDB connection string is not defined in the .env file');
    process.exit(1);
}
const connectToDatabase = async () => {
    try {
        await mongoose_1.default.connect(url);
        logger_1.default.info('✅ Connected to MongoDB');
        // console.log('✅ Connected to MongoDB');
    }
    catch (err) {
        logger_1.default.error('❌ Failed to connect to MongoDB', err);
        // console.error('❌ Failed to connect to MongoDB', err);
        process.exit(1);
    }
};
exports.connectToDatabase = connectToDatabase;
