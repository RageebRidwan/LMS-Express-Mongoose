import config from "./config";
import express, { Application, NextFunction, Request, Response } from "express";
import mongoose, { Error } from "mongoose";
import cors from "cors";
import router from "./modules/routes/routes";

const app: Application = express();
// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use(router);
// Welcome
app.use("", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Welcome to the Library Management System API 📚✨",
    info: "Explore books, borrow and manage with ease!",
  });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "ValidationError") {
    const formattedError = JSON.parse(JSON.stringify(err));
    res.status(400).json({
      message: "Validation Failed",
      success: false,
      error: {
        name: formattedError.name,
        errors: formattedError.errors,
      },
    });
  }
  res.status(500).json({
    message: "Something went wrong",
    success: false,
    error: err.message || "Unknown error",
  });
});
const port = config.port;

app.listen(port, () => {
  console.log(`App is listening to port : ${port}`);
});

async function server() {
  try {
    await mongoose.connect(config.database_url!);
    console.log("✅ Connected to DB");
  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
  }
}
server();
