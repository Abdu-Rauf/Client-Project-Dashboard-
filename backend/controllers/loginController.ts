import { Request, Response } from "express"
import { z } from "zod";
import { loginBodySchema } from "../schema/auth";
import loginService from "../service/loginService";


export default async function loginController(req: Request, res: Response) {

    const parsed = loginBodySchema.safeParse(req.body);
    console.log("parsed body ",parsed);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid body",
            issues: z.flattenError(parsed.error)
        });
    }

    // Extract email,pwd and call Servie
    const { email, pwd } = parsed.data;
    const result = await loginService(email, pwd);

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