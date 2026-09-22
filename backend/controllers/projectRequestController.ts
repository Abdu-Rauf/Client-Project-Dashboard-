import { Request, Response } from "express";
import { z } from "zod";
import projectRequestService from "../service/projectRequestService";
import { projectReqSchema } from "../schema/projectReq";

export default function projectRequestController(req: Request, res: Response) {
    const parsed = projectReqSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid body",
            issues: z.flattenError(parsed.error)
        });
    }

    const result = projectRequestService(parsed.data);

    if (!result.success) {
        return res.status(400).json({
            message: result.message
        });
    }

    return res.status(200).json({
        message: result.message,
        projectRequest: result.projectRequest
    });
}
