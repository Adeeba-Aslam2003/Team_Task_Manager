import express from "express";
import userRoutes from "./userRoute.js";
import taskRoutes from "./taskRoutes.js"; // 👈 import

const router = express.Router();

// test route
router.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// 👇 THIS IS MAIN FIX
router.use("/users", userRoutes); 
router.use("/tasks", taskRoutes);

export default router;