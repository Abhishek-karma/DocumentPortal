import express from "express";
import {
  shareDocument,
  revokeSharedDocument,
  getSharedDocuments,
} from "../controllers/share.controller.js";
import { viewSharedDocument } from "../controllers/share.controller.js";

const router = express.Router();

router.post("/share-document", shareDocument);

router.delete("/revoke/:docId/:receiverId", revokeSharedDocument);

router.get("/shared-documents", getSharedDocuments);

router.get("/view-shared-document/:receiverId", viewSharedDocument);

export default router;
