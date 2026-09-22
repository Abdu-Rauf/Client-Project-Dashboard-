import { Request, Response } from "express";
import { z } from "zod";
import { teamSchema } from "../schema/team";
import teamService from "../service/teamService";

export default function teamController(req: Request, res: Response) {
    const parsed = teamSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid body",
            issues: z.flattenError(parsed.error),
        });
    }

    const result = teamService(parsed.data);

    if (!result.success) {
        return res.status(400).json({
            message: result.message,
        });
    }

    return res.status(200).json({
        message: result.message,
        team: result.team,
    });
}
