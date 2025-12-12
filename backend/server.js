import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";
import dotenv from "dotenv";
dotenv.config();

// Path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("MONGO_URI from env:", process.env.MONGO_URI);

const app = express();
const PORT = ENV_VARS.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

// Serve frontend in production
if (ENV_VARS.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "..", "frontend", "dist");

    // Serve compiled static files
    app.use(express.static(frontendPath));

    // SPA fallback (React/Vite routing)
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
