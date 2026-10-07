import { Request, Response } from "express";
import { z } from "zod";
import { projectSchema } from "../schema/project";
import projectService from "../service/projectService";
// import "../types/auth";

export default async function projectController(req: Request, res: Response) {
    const parsed = projectSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid body",
            issues: z.flattenError(parsed.error),
        });
    }
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await projectService(parsed.data, req.user.id);

    if (!result.success) {
        return res.status(400).json({
            message: result.message,
        });
    }

    return res.status(200).json({
        message: result.message,
    });
}
