import { z } from "zod";

export const teamSchema = z.object({
    pm_id: z.number().int().positive(),
    developer_ids: z
        .array(z.number().int().positive())
        .min(1, { error: "at least one developer is required" }),
});

export type CreateTeamBody = z.infer<typeof teamSchema>;
