import { z } from "zod";

export const projectReqSchema = z.object({
    title: z.string().trim().min(1, { error: "title is required" }),
    description: z.string().trim().min(1, { error: "description is required" }),
    // admin picks a PM user; only id + role are needed for the relationship
    pm_id: z.number().int().positive()
});

export type ProjectReqBody = z.infer<typeof projectReqSchema>;
