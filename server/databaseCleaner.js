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
cron.schedule("*/2 * * * *", async () => { // Menja se "0 0 * * *" u "*/2 * * * *"
    console.log("Running database cleaner");
  
    // Datum pre 2 minuta (za testiranje)
    const twoMinutesAgo = new Date();
    twoMinutesAgo.setMinutes(twoMinutesAgo.getMinutes() - 2); // Promeni na -2 minuta za testiranje
  
    try {
      // Brisanje naloga koji nisu verifikovani i koji su kreirani pre više od 2 minuta
      const result = await User.deleteMany({
        status: "unverified",
        createdAt: { $lt: twoMinutesAgo },
      });
  
      console.log(`${result.deletedCount} unverified accounts deleted.`);
    } catch (error) {
      console.error("Error during database cleaning:", error);
    }
  });
