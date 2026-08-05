import dotenv from "dotenv";

dotenv.config({
  path:
    process.env.NODE_ENV === "production" ? ".env.production" : ".env.local",
});

import authRoutes from "./routes/authRoutes.js";
import express from "express";
import cors from "cors";
import User from "./models/User.js";
import connectDB from "./db.js";

console.log("Running file:", import.meta.url);
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "http://200.141.1.49:5174",
      "http://200.141.1.49",
      "http://codewithsoni.online",
      "https://codewithsoni.online",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS"],
  }),
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Api route
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from abhisoni" });
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Auth route working" });
});

app.use("/api/auth", authRoutes);

const PORT = 4000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
