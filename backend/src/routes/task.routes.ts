import { Router } from "express";
import { createTask, getAllTasks } from "../controllers/task.controllers.js";

const router = Router();

// routes;
router.post("/create", createTask);
router.get("/", getAllTasks);

export default router;
