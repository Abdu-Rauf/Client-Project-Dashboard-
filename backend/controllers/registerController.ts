import { Request, Response } from "express"
import { z } from "zod";
import registerService from "../service/registerService";
import { registerBodySchema } from "../schema/auth";


export default function registerController(req: Request, res: Response) {

    const parsed = registerBodySchema.safeParse(req.body);
    console.log(parsed);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid body",
            issues: z.flattenError(parsed.error)
        });
    }

    // Call service
    const result = registerService(parsed.data);

    // Convert service result into HTTP response
    if (!result.success) {
        return res.status(400).json({
            message: result.message
        });
    }

    return res.status(200).json({
        message: result.message,
        token: result.token
    });
}