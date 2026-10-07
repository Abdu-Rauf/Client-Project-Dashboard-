import { z } from "zod";

export const projectSchema = z.object({
    project_request_id: z.uuid({ error: "project request id must be a uuid" }),
    name: z.string().trim().min(1, { error: "name is required" }),
    description: z.string().trim().min(1, { error: "description is required" }),
    developer_ids: z
        .array(z.number().int().positive())
        .min(1, { error: "at least one developer is required" }),
});

export type ProjectBody = z.infer<typeof projectSchema>;
