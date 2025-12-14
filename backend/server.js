import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";

dotenv.config();

// Connect DB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/tv", tvRoutes);
app.use("/api/v1/search", searchRoutes);

// ---------- Frontend (FIXED) ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MUST match pipeline output: backend/public
const frontendPath = path.join(__dirname, "public");

app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  if (req.originalUrl.startsWith("/api")) return;
  res.sendFile(path.join(frontendPath, "index.html"));
});
// -------------------------------------

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
