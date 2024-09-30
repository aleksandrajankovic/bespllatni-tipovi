import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    role: { type: String, default: "user" },
    status: {
      type: String,
      enum: ["unverified", "verified"],
      default: "unverified",
    },
    verificationToken: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    expireAt: {
      type: Date,
      default: () => new Date(+new Date() + 24 * 60 * 60 * 1000), // Ističe za 24 sata
    },
  },
  { timestamps: true }
);

userSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("User", userSchema);


