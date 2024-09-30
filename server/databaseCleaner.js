import cron from "node-cron";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

// Konekcija sa bazom
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log("Error connecting to the database:", error));

// Definisanje cron posla
cron.schedule("0 0 * * *", async () => {
  console.log("Running database cleaner");

  const oneDayAgo = new Date();
  oneDayAgo.setHours(oneDayAgo.getHours() - 24); // Postavi na -24 sata za brisanje posle jednog dana

  try {
      const result = await User.deleteMany({
          status: "unverified",
          createdAt: { $lt: oneDayAgo },
      });

      console.log(`${result.deletedCount} unverified accounts deleted.`);
  } catch (error) {
      console.error("Error during database cleaning:", error);
  }
});

