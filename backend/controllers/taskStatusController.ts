import { Request, Response } from "express";
import { z } from "zod";
import { taskstatusSchema } from "../schema/taskStatus";
import taskStatusService from "../service/taskStatusService";

export default async function taskStatusController(req: Request, res: Response) {

    // receive status, dev id and taskid
    const parsed = taskstatusSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid body",
            issues: z.flattenError(parsed.error),
        });
    }

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await taskStatusService(parsed.data, req.user.id);
    if (!result.success) {
        return res.status(400).json({
            message: result.message,
        });
    }

    return res.status(200).json({
        message: result.message,
    });
}