import mongoose from "mongoose";

const tipsSchema = mongoose.Schema({
  title: String,
  rival1: String,
  rival2: String,
  scoreRival1: String,
  scoreRival2: String,
  league: String,
  country: String,
  sport: String,
  tipsAndQuotes: String,
  tipsAndQuotesLink: String,
  description: String,
  creator: String,
  tipDate: Date,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  dislikeCount: {
    type: Number,
    default: 0,
  },
  success: {
    type: Boolean,
    default: false,
  },
  failed: {
    type: Boolean,
    default: false,
  },
  comments: [
    {
      user: String,
      text: String,
      createdAtComment: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

const TipsModal = mongoose.model("Tip", tipsSchema);

export default TipsModal;
