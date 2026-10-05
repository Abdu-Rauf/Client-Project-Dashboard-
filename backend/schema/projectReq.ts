import { z } from "zod";

export const projectReqSchema = z.object({
    title: z.string().trim().min(1, { error: "title is required" }),
    description: z.string().trim().min(1, { error: "description is required" }),
    // admin picks a PM user; only id + role are needed for the relationship
    assigned_pm_id: z.number().int().positive(),
    // z.iso.date ensures the string sent is in correct format then transforms it into a date type.
    deadline: z.iso.date({ error: "deadline must be a datetime" }).transform((value) => new Date(value)),
});

export type ProjectReqBody = z.infer<typeof projectReqSchema>;
