import dotenv from "dotenv"
import express, { Express } from "express"
import cors from "cors"
import { connectToDatabase } from "./config/database";
import logger from "./utils/logger";

const port = process.env.PORT || 9090;

dotenv.config();
dotenv.config({
    path: ".env",
    override: true,
});

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));


app.use(
    cors({
        origin: process.env.ALLOWED_DOMAINS?.split(" "),
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      // console.log(`🚀 Server is running on http://localhost:${port}`);
      logger.info(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    logger.error("❌ Failed to connect to the database", err);
    // console.error('Failed to connect to the database', err);
    process.exit(1);
  });