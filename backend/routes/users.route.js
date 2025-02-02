import express from "express";
import { getAllUsers } from "../controllers/users.controller.js";

const router = express.Router();

router.get("/all-users", getAllUsers);

export default router;
