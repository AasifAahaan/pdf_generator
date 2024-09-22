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
const userRoutes_1 = __importDefault(require("../src/routes/userRoutes"));
const productRoutes_1 = __importDefault(require("../src/routes/productRoutes"));
const path = require('path');
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
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express_1.default.static(path.join(__dirname, 'public')));
app.use((0, cors_1.default)({
    origin: process.env.ALLOWED_DOMAINS?.split(" "),
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use('/api/users', userRoutes_1.default);
app.use('/api/add', productRoutes_1.default);
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
