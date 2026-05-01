import express from "express";
import userRoute from "./userRoute.js";
import taskRoute from "./taskRoute.js";



const router = express.Router();

// test route
router.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// 👇 THIS IS MAIN FIX
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);

export default router;