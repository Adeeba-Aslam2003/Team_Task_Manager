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

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://teamtaskify.netlify.app",
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// ✅ ROOT ROUTE (IMPORTANT - Railway test ke liye)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ API ROUTES
app.use("/api", routes);

// ✅ Error handling
app.use(routeNotFound);
app.use(errorHandler);

// ✅ 8️⃣ LAST LINE (YAHI ADD KARNA HAI)
const port = process.env.PORT || 5000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on ${port}`);
});