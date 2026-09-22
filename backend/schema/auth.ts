import { z } from "zod";

// as const tells ts to treat the arr as read only with fixed literal ([]string = readonly[admin,pm,dev])
// ts type checks that a readonly tuple of literals is passed to z.enum (both only exist at compile time) 
export const roles = ["admin", "developer", "project manager"] as const;

export const loginBodySchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, { error: "email is required" })
        .pipe(z.email({ error: "invalid email" })),
    pwd: z.string().min(1, { error: "pwd is required" }),
});

// z.object creates a schema object whose keys will have their own nested schemas
export const registerBodySchema = z.object({
    //z.string() creates a string schema with extra steps 
    name: z.string().trim().min(1, { error: "name is required" }),
    email: z
        .string()
        .trim()
        .min(1, { error: "email is required" })
        .pipe(z.email({ error: "invalid email" })),
    pwd: z.string().min(1, { error: "pwd is required" }),
    role: z
        .string()
        .trim()
        .min(1, { error: "role is required" })
        .transform((value) => value.toLowerCase())
        .pipe(z.enum(roles, { error: "invalid role" })),
        //z.enum accepts a readonly arr and creates a new schema allowing only those arr values
        //pipe passes the output value from a schema to a new schema
});

export type LoginBody = z.infer<typeof loginBodySchema>;
export type RegisterBody = z.infer<typeof registerBodySchema>;
