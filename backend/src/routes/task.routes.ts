import { Router } from "express";
import { createTask } from "../controllers/task.controllers.js";

const router = Router();

// routes;
router.post("/create", createTask);

export default router;
