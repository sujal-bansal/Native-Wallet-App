import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionRoute from "./routes/transactionRoutes.js";
import job from "./config/cron.js";

dotenv.config();

if (process.env.NODE_ENV === "production") job.start();
const PORT = process.env.PORT || 8000;
const app = express();

app.use(rateLimiter);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Ok" });
});

app.use("/api/transactions", transactionRoute);
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${8000}`);
  });
});
