import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type JwtPayload = {
    sub: string
    role: string
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const header = req.headers.authorization;
        const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: "JWT secret is not configured" });
        }
        // ts doesnt sees our field values ie , it just knows decode is of type string | jwt.JwtPayload
        // we type cast decoded as jwtpayload so that we can use our fields(role,sub) without type check errors at compile time
        const decoded = jwt.verify(token, secret) as JwtPayload;
        (req as Request & { user?: JwtPayload }).user = decoded;
        console.log(decoded);
        next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
