import express from "express";
const router = express.Router(); //organizacija putanja i povezivanje sa kontrolerima

import { signup, signin, verifyAccount } from "../controllers/user.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/verify/:token", verifyAccount);

export default router;
