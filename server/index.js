import express from "express";
import cors from "cors";

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
    methods: ["POST", "GET", "PUT", "PATCH"],
  }),
);

//Api route
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from abhisoni" });
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

const PORT = 4000;

app.listen(PORT, "0.0.0.0", () => console.log("Listening at port 4000"));
