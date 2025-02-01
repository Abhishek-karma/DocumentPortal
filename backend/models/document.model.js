import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  publicId: { type: String, required: true }, // Needed for Cloudinary deletion
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Document', documentSchema);
