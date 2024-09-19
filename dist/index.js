"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const logger_1 = __importDefault(require("./utils/logger"));
const port = process.env.PORT || 9090;
dotenv_1.default.config();
dotenv_1.default.config({
    path: ".env",
    override: true,
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use(express_1.default.static("public"));
app.use((0, cors_1.default)({
    origin: process.env.ALLOWED_DOMAINS?.split(" "),
    credentials: true,
    optionsSuccessStatus: 200,
}));
(0, database_1.connectToDatabase)()
    .then(() => {
    app.listen(port, () => {
        // console.log(`🚀 Server is running on http://localhost:${port}`);
        logger_1.default.info(`🚀 Server is running on http://localhost:${port}`);
    });
})
    .catch((err) => {
    logger_1.default.error("❌ Failed to connect to the database", err);
    // console.error('Failed to connect to the database', err);
    process.exit(1);
});
