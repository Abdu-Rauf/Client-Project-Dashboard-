// verify role 

import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "./authMiddleware";

// create the middleware factory to pass allowed roles
// ... is a rest parameter which collects all the arguments into an array
export default function roleMiddleware(...allowedRoles:string[]) {
    // return the actual middleware
    return (req: Request, res:Response, next:NextFunction)=>{
        const user = (req as Request & {user?:JwtPayload}).user;
        console.log(user);

        if(!user || !allowedRoles.includes(user.role)){
            return res.status(403).json({message:"User not authorized"})
        }
        next();
    };
}
    