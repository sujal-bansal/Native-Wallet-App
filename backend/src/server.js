import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionRoute from "./routes/transactionRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(rateLimiter);
app.use(express.json());

app.use("/api/transactions", transactionRoute);
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${8000}`);
  });
});
