import z from "zod";
import { Request, Response } from "express";
import { taskSchema } from "../schema/tasks";
import createTaskService from "../service/createTaskService";

export default async function createTaskController(req:Request, res:Response){
    
    const parsed = taskSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid body",
            issues: z.flattenError(parsed.error)
        });
    }
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const result = await createTaskService(parsed.data, req.user.id);

        if (!result.success) {
        return res.status(400).json({
            message: result.message
        });
    }

    return res.status(200).json({
        message: result.message
    });

}