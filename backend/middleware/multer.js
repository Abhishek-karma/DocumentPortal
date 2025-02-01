import multer from 'multer';

const storage = multer.memoryStorage(); // Store file in memory before uploading to Cloudinary

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export default upload;
