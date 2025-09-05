import { PrismaClient, type Task } from "@prisma/client";
import type { Request, Response } from "express";
import {
	CreateTaskSchema,
	UpdateTaskSchema,
} from "../../../shared/src/task.schema.ts";
import { ZodError } from "zod";

const prisma = new PrismaClient();

// create a task;
export const createTask = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const data = CreateTaskSchema.parse(req.body);
		const newTask = await prisma.task.create({ data });

		res.status(201).json({
			task: newTask,
		});
	} catch (error) {
		if (error instanceof ZodError) {
			res.status(400).json({ error: error.issues.map((e) => e.message)[0] });
		} else {
			console.error("Error creating task:", error);
			res.status(500).json({ error: "Internal server error" });
		}
	}
};

// fetch all the tasks;
export const getAllTasks = async (
	_req: Request,
	res: Response
): Promise<void> => {
	try {
		const tasks: Task[] = await prisma.task.findMany();

		res.status(200).json({
			tasks: tasks.length ? tasks : [],
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
		}
		res.status(500).json({ error: "Internal server error" });
	}
};

// delete a task;
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
	const taskId = Number(req.params.id);
	if (isNaN(taskId) || taskId <= 0 ) {
		res.status(400).json({error: "Invalid Id"})
	}
	try {
		const task = await prisma.task.findUnique({
			where: { id: taskId }
		});
		
		if (!task) {
			res.status(404).json({
				error: "Task no longer exist"
			});
		}

		const taskDeleted = await prisma.task.delete({
			where: {
				id: taskId
			}
		});

		res.status(200).json({
			message: "Task deleted successfully",
			task: taskDeleted
		})

	} catch (error) {
		if (error instanceof (Error)) {
			console.error(error.message);
		}
		res.status(500).json({
			error: "Internal server error"
		})
	}
}