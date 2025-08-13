import express from "express";
import {
  deleteTransaction,
  getSummary,
  getTransaction,
  postTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/:userId", getTransaction);

router.post("/", postTransaction);

router.delete("/:id", deleteTransaction);

router.get("/summary/:userId", getSummary);

export default router;
