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
  dislikeTip,
  addCommentToTip,
  getComments,
  deleteComment,
  markAsSuccess,
  markAsFailed,
} from "../controllers/tips.js";

router.post("/", createTip);
router.get("/", getTips);
router.get("/:id", getTip);
router.delete("/:id", deleteTip);
router.patch("/:id", updateTip);
router.post("/:id/like", likeTip);
router.post("/:id/dislike", dislikeTip);
router.post("/:id/comment", addCommentToTip);
router.get("/:id/comments", getComments);
router.delete("/:id/comment/:commentId", deleteComment);
router.put("/:id/success", markAsSuccess);
router.put("/:id/failed", markAsFailed);

export default router;
