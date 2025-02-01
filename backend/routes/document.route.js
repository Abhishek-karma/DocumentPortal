import express from 'express';
import upload from '../middleware/multer.js';
import { 
  uploadDocument, 
  getDocuments, 
  getDocumentById,
  updateDocument, 
  deleteDocument 
} from '../controllers/document.controller.js';
import {verifyToken} from '../middleware/verifyToken.js'; // Ensure user is authenticated

const router = express.Router();

// Routes
router.post('/upload', verifyToken, upload.single('file'), uploadDocument);
router.get('/', verifyToken, getDocuments);
router.get('/:id', verifyToken, getDocumentById); 
router.put('/:id', verifyToken,upload.single('file'), updateDocument);
router.delete('/:id', verifyToken, deleteDocument);

export default router;
