import Document from "../models/document.model.js";
import Share from "../models/share.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

// Share Document
export const shareDocument = async (req, res) => {
  const { senderId, receiverId, documentId, permissions } = req.body;

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or Receiver not found" });
    }

    const document = await Document.findById(documentId);
    if (!document || document.userId.toString() !== senderId) {
      return res
        .status(404)
        .json({ message: "Document not found or not owned by sender" });
    }

    const share = new Share({
      documentId: new mongoose.Types.ObjectId(documentId),
      senderId: senderId,
      receiverId: receiverId,
      permissions: permissions || "view",
    });

    await share.save();

    document.sharedWith.push({
      receiverId: new mongoose.Types.ObjectId(receiverId),
      permissions: permissions || "view",
    });
    await document.save();

    res.status(200).json({ message: "Document shared successfully", share });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sharing document" });
  }
};

export const revokeSharedDocument = async (req, res) => {
  const { docId, receiverId } = req.params;

  try {
    const document = await Document.findById(docId);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Remove the receiver from the sharedWith array
    document.sharedWith = document.sharedWith.filter(
      (sharedUser) => sharedUser.receiverId.toString() !== receiverId
    );
    await document.save();

    // Optionally, delete the share record from the Share model
    await Share.deleteOne({ documentId: docId, receiverId });

    res.status(200).json({ message: "Document access revoked successfully" });
  } catch (error) {
    console.error("Error revoking access:", error);
    res.status(500).json({ message: "Error revoking document access" });
  }
};

export const getSharedDocuments = async (req, res) => {
  const { userId } = req.params; // The user whose shared documents to fetch

  try {
    const shares = await Share.find({ receiverId: userId }).populate(
      "documentId"
    );
    if (!shares.length) {
      return res.status(404).json({ message: "No shared documents found" });
    }

    const sharedDocuments = shares.map((share) => ({
      documentId: share.documentId._id,
      fileName: share.documentId.fileName,
      permissions: share.permissions,
    }));

    res.status(200).json(sharedDocuments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching shared documents" });
  }
};

export const viewSharedDocument = async (req, res) => {
  const { receiverId } = req.params;

  try {
    const documents = await Document.find({
      "sharedWith.receiverId": receiverId, // Filter documents shared with this receiver
    });

    if (!documents.length) {
      return res.status(404).json({ message: "No shared documents found" });
    }

    // Map document details with permissions
    const documentDetails = documents.map((doc) => {
      const shareRecord = doc.sharedWith.find(
        (record) => record.receiverId.toString() === receiverId
      );

      return {
        _id: doc._id,
        fileName: doc.fileName,
        fileUrl: doc.fileUrl,
        permissions: shareRecord?.permissions, // Permissions (view/edit)
      };
    });

    res.json(documentDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving documents" });
  }
};
