import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  createTip,
  deleteTip,
  getTip,
  getTips,
  updateTip,
  likeTip,
  addCommentToTip,
  getComments,
  deleteComment,
} from "../controllers/tips.js";

router.post("/", createTip);
router.get("/", getTips);
router.get("/:id", getTip);
router.delete("/:id", deleteTip);
router.patch("/:id", auth, updateTip);
router.post("/:id/like", auth, likeTip);
router.post("/:id/comment", addCommentToTip);
router.get("/:id/comments", getComments);
router.delete("/:id/comment/:commentId", deleteComment);

export default router;
