import { Request, Response } from "express"
import authService from "../service/authService";

export default function loginController(req: Request, res: Response) {
    // Extract email and password
    const { email, pwd } = req.body;

    // Call service
    const result = authService(email, pwd);

    // Convert service result into HTTP response
    if (!result.success) {
        return res.status(400).json({
            message: result.message
        });
    }

    return res.status(200).json({
        message: result.message
    });
}