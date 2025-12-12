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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("MONGO_URI from env:", process.env.MONGO_URI);

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

// Production — serve frontend
if (ENV_VARS.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
    connectDB();
});
