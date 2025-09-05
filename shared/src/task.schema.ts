import { z } from "zod";

export const TaskSchema = z.object({
	id: z.number().int().positive(),
	title: z
		.string({ error: "Task is required" })
		.min(1, { error: "Task is required" }),
	isComplete: z.boolean().default(false),
	createdAt: z.date().default(() => new Date()),
});

export const CreateTaskSchema = TaskSchema.omit({ id: true, createdAt: true });
export const UpdateTaskSchema = TaskSchema.partial().omit({
	id: true,
	createdAt: true,
});
export type Task = z.infer<typeof TaskSchema>;
