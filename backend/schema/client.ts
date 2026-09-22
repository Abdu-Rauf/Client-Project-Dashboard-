import { z } from "zod";

export const clientSchema = z.object({
    name:z.string().trim().min(1,{error:"name is required"}),
    email: z
    .string()
    .trim()
    .min(1, { error: "email is required" })
    .pipe(z.email({ error: "invalid email" })),
    contact: z
        .string()
        .trim()
        .regex(/^\d{10}$/, { error: "contact must be a 10 digit number" }),
});

export type clientBody = z.infer<typeof clientSchema>;