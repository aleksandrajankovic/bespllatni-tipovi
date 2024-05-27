import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tipsRouter from "./routes/tips.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Dodavanje CORS zaglavlja ručno
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/users", userRouter);
app.use("/tip", tipsRouter);

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Baza podataka je uspešno povezana!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

export default app;
