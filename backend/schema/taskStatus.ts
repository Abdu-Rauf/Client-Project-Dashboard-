import { z } from "zod";

export const taskstatusSchema = z.object({
    status: z.enum(["to_do", "in_progress", "completed"]),
    task_id: z.uuid({ error: "task id must be a uuid" }),
});

export type TaskStatusBody = z.infer<typeof taskstatusSchema>;