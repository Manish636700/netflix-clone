import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";

dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

/* ------------------ CORS CONFIG FOR ALB + MULTIPLE EC2 ------------------ */
app.use(
  cors({
    origin: [
      "http://YOUR-ALB-DNS",      // Example: http://myapp-alb-123.ap-south-1.elb.amazonaws.com
      "http://YOUR-DOMAIN",       // Example: http://myapp.com
      "https://YOUR-DOMAIN"       // HTTPS domain
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

/* ------------------ API ROUTES ------------------ */
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/tv", tvRoutes);
app.use("/api/v1/search", searchRoutes);

/* ------------------ SERVE FRONTEND BUILD ------------------ */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDist = path.join(__dirname, "../frontend/dist");

app.use(express.static(frontendDist));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

/* ------------------ START SERVER ------------------ */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
