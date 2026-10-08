import {z} from "zod";

export const taskSchema = z.object({
    project_id: z.number().int().positive(),
    title: z.string().trim().min(1, { error: "title is required" }),
    description: z.string().trim().min(1, { error: "description is required" }),
    assigned_developer_id: z.number().int().positive(),
    priority: z.enum(["low", "high", "very_high"]),
    deadline: z.iso.date({ error: "deadline must be a date" }).transform((value) => new Date(value)),
});

export type TaskBody = z.infer<typeof taskSchema>;

