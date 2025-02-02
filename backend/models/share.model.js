import mongoose from "mongoose";

const shareSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  permissions: { type: String, enum: ["view", "edit"], default: "view" },
  sharedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
});

const Share = mongoose.model("Share", shareSchema);

export default Share;
