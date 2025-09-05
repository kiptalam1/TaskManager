import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import {
	CreateTaskSchema,
	UpdateTaskSchema,
} from "../../../shared/src/task.schema.ts";
import { ZodError } from "zod";

const prisma = new PrismaClient();
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
			res.status(400).json({ error: error.message });
		} else {
			console.error("Error creating task:", error);
			res.status(500).json({ error: "Internal server error" });
		}
	}
};
