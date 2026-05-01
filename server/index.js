import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import dbConnection from "./utils/connectDB.js";

dotenv.config();

// ✅ DB connect
dbConnection();

const port = process.env.PORT || 5000;

const app = express();

// ✅ CORS FIX (🔥 IMPORTANT)

app.use(
  cors({
    origin: [
      "https://team-task-manager-oqs5-mocha.vercel.app",
      "https://team-task-manager-oqs5-2k22cse2212759-9149s-projects.vercel.app"
    ],
    credentials: true,
  })
);
// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Cookies
app.use(cookieParser());

// ✅ Logger
app.use(morgan("dev"));

// ✅ TEST ROUTE (Railway check)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ API ROUTES
app.use("/api", routes);

// ❌ NOT FOUND
app.use(routeNotFound);

// ❌ ERROR HANDLER
app.use(errorHandler);

// ✅ START SERVER
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${port}`);
});