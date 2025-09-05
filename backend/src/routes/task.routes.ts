import { Router } from "express";
import {
	createTask,
	deleteTask,
	getAllTasks,
} from "../controllers/task.controllers.js";

const router = Router();

// routes;
router.post("/create", createTask);
router.get("/", getAllTasks);
router.delete("/:id", deleteTask);

export default router;
