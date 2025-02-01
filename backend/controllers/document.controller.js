import Document from '../models/document.model.js';
import cloudinary from '../utils/cloudinary.js';
import mongoose from "mongoose";
// Upload Document
export const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        if (!req.user?.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const result = await cloudinary.uploader.upload_stream(
            { folder: "documents" },
            async (error, result) => {
                if (error) {
                    console.error("Cloudinary Upload Error:", error);
                    return res.status(500).json({ 
                        message: "File upload failed", 
                        error: error.message 
                    });
                }

                const newDocument = new Document({
                    userId: req.user.id,
                    fileName: req.file.originalname,
                    fileUrl: result.secure_url,
                    publicId: result.public_id,
                });

                await newDocument.save();
                res.status(201).json({ 
                    message: "File uploaded successfully", 
                    document: newDocument 
                });
            }
        );

        result.end(req.file.buffer);
    } catch (error) {
        console.error("Upload Failed:", error);
        res.status(500).json({ 
            message: "Upload failed", 
            error: error.message 
        });
    }
};

// Get All Documents for a User
export const getDocuments = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const documents = await Document.find({ userId: req.user.id });
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ 
            message: 'Failed to fetch documents', 
            error: error.message 
        });
    }
};
export const getDocumentById = async (req, res) => {
    try {
        const documentId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(documentId)) {
            return res.status(400).json({ message: "Invalid document ID" });
        }

        const document = await Document.findById(new mongoose.Types.ObjectId(documentId));

        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
// Update Document
export const updateDocument = async (req, res) => {
    try {
        const documentId = req.params.id;
        const { file } = req;

        if (!documentId) {
            return res.status(400).json({ message: "Document ID is required" });
        }

        const document = await Document.findById(documentId);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        if (document.userId.toString() !== req.user?.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (file) {
            const uploadPromise = new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "documents" },
                    async (error, result) => {
                        if (error) {
                            console.error("Cloudinary Upload Error:", error);
                            return reject(error);
                        }

                        // Delete old file first
                        await cloudinary.uploader.destroy(document.publicId);

                        document.fileUrl = result.secure_url;
                        document.publicId = result.public_id;
                        document.fileName = req.file.originalname;
                        await document.save();
                        resolve(document);
                    }
                );
                stream.end(file.buffer);
            });

            const updatedDoc = await uploadPromise;
            return res.status(200).json({
                message: "Document updated successfully",
                document: updatedDoc
            });
        }

        // Update metadata only
        document.title = req.body.title || document.title;
        await document.save();
        res.status(200).json({
            message: "Document metadata updated",
            document
        });

    } catch (error) {
        console.error("Update failed:", error);
        res.status(500).json({
            message: "Update failed",
            error: error.message
        });
    }
};

// Delete Document
export const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findById(id);
        
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        if (document.userId.toString() !== req.user?.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await cloudinary.uploader.destroy(document.publicId);
        await document.deleteOne();

        res.status(200).json({ 
            message: 'Document deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Delete failed', 
            error: error.message 
        });
    }
};

// Share Document
export const shareDocument = async (req, res) => {
    try {
        const documentId = req.params.id;
        const { recipientEmail } = req.body;

        if (!recipientEmail) {
            return res.status(400).json({ message: "Recipient email required" });
        }

        const document = await Document.findById(documentId);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        if (document.userId.toString() !== req.user?.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const shareToken = crypto.randomBytes(20).toString('hex');
        const shareableLink = `${process.env.FRONTEND_URL}/shared/${documentId}?token=${shareToken}`;

        // Store share token with expiration (e.g., 24 hours)
        document.sharedTokens.push({
            token: shareToken,
            expiresAt: new Date(Date.now() + 86400000) // 24 hours
        });
        await document.save();

        // Send email logic here (optional)
        
        res.status(200).json({
            message: "Share link generated",
            shareableLink,
            expiresAt: document.sharedTokens[0].expiresAt
        });
    } catch (error) {
        console.error("Share failed:", error);
        res.status(500).json({ 
            message: "Share failed", 
            error: error.message 
        });
    }
};