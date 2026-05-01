import express from "express";
import userRoutes from "./userRoute.js";
import taskRoutes from "./taskRoute.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("API is working 🚀");
});

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);

export default router;