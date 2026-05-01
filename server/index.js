import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import dbConnection from "./utils/connectDB.js";

dotenv.config();
dbConnection();

const port = process.env.PORT || 5000;
const app = express();

// ✅ CORS (FINAL FIX)
app.use(cors({
  origin: true, // 🔥 debug mode
  credentials: true
}));

app.options("*", cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${port}`);
});