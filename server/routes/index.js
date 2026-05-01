import express from "express";

const router = express.Router();

// ✅ ये route जरूरी है
router.get("/", (req, res) => {
  res.send("API is working 🚀");
});

export default router;