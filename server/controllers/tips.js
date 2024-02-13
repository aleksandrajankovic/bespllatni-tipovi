import TipsModal from "../models/tips.js";
import mongoose from "mongoose";

export const createTip = async (req, res) => {
  const tip = req.body;
  console.log("Received tip data:", tip);

  const newTip = new TipsModal({
    ...tip,
    createdAt: new Date().toISOString(),
  });

  try {
    // Sačuvaj tip
    await newTip.save();
    console.log("Tip saved successfully (before comments):", newTip);

    res.status(201).json(newTip);
  } catch (error) {
    console.error("Error saving tip:", error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getTips = async (req, res) => {
  try {
    const tips = await TipsModal.find();
    res.status(200).json(tips);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getTip = async (req, res) => {
  const { id } = req.params;

  try {
    const tip = await TipsModal.findById(id).populate("comments");
    res.status(200).json(tip);
  } catch (error) {
    console.error("Error getting tip:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteTip = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tips exist with id: ${id}` });
    }
    await TipsModal.findByIdAndRemove(id);
    res.json({ message: "Tip deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateTip = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    creator,
    rival1,
    rival2,
    scoreRival1,
    scoreRival2,
    league,
    country,
    sport,
    tipsAndQuotes,
    tipsAndQuotesLink,
    tipDate,
  } = req.body;

  console.log("Received updated tip data:", {
    title,
    description,
    creator,
    rival1,
    rival2,
    scoreRival1,
    scoreRival2,
    league,
    country,
    sport,
    tipsAndQuotes,
    tipsAndQuotesLink,
    tipDate,
  });

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tip exist with id: ${id}` });
    }

    const updatedTip = {
      creator,
      title,
      description,
      rival1,
      rival2,
      scoreRival1,
      scoreRival2,
      league,
      country,
      sport,
      tipsAndQuotes,
      tipsAndQuotesLink,
      tipDate,

      _id: id,
    };

    await TipsModal.findByIdAndUpdate(id, updatedTip, { new: true });
    console.log("Tip updated successfully:", updatedTip);
    res.json(updatedTip);
  } catch (error) {
    console.error("Error updating tip:", error);
    res.status(404).json({ message: "Something went wrong" });
  }
};
export const likeTip = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tip exists with id: ${id}` });
    }

    const tip = await TipsModal.findById(id);
    const updatedTip = await TipsModal.findByIdAndUpdate(
      id,
      { likeCount: tip.likeCount + 1 },
      { new: true } //vraca azurirane podatke, u slucaju false vraca se originalni podaci pre azuriranja
    );

    console.log("Updated tip:", updatedTip);
    res.status(200).json(updatedTip);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
export const dislikeTip = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tip exists with id: ${id}` });
    }

    const tip = await TipsModal.findById(id);
    const updatedTip = await TipsModal.findByIdAndUpdate(
      id,
      { dislikeCount: tip.dislikeCount + 1 },
      { new: true } //vraca azurirane podatke, u slucaju false vraca se originalni podaci pre azuriranja
    );

    console.log("Updated tip:", updatedTip);
    res.status(200).json(updatedTip);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
export const addCommentToTip = async (req, res) => {
  const { id } = req.params;
  const { user, text } = req.body;
  const createdAtComment = new Date().toISOString();
  try {
    const tip = await TipsModal.findById(id);

    if (!tip) {
      return res.status(404).json({ message: "Tip not found" });
    }

    const newComment = { user, text, createdAtComment };
    tip.comments.push(newComment);

    const updatedTip = await tip.save();

    res.status(200).json(updatedTip);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding comment to tip", error: error.message });
  }
};
export const getComments = async (req, res) => {
  const { id } = req.params;

  try {
    const tip = await TipsModal.findById(id);

    if (!tip) {
      return res.status(404).json({ message: "Savet nije pronađen." });
    }

    const comments = tip.comments;
    res.status(200).json(comments);
  } catch (error) {
    console.error("Greška prilikom dohvatanja komentara:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteComment = async (req, res) => {
  const { id, commentId } = req.params;

  try {
    const tip = await TipsModal.findByIdAndUpdate(
      id,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    res.json(tip);
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const markAsSuccess = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTip = await TipsModal.findByIdAndUpdate(
      id,
      { success: true, failed: false },
      { new: true }
    );
    res.status(200).json(updatedTip);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const markAsFailed = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTip = await TipsModal.findByIdAndUpdate(
      id,
      { success: false, failed: true },
      { new: true }
    );
    res.status(200).json(updatedTip);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
