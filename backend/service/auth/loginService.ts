import type { AuthResult } from "../../types/auth";
import { signUserToken } from "../../utils/jwt";
import { verifyPassword } from "../../utils/password";
import { prisma } from "../../utils/prisma";

export default async function loginService(email: string, pwd: string) : Promise<AuthResult> {
    const user = await prisma.user.findFirst({
        where : {email:email},
    })
    // const user = users.find((u) => u.email === email);
    if (!user) {
        return {
            success:false,
            message:"user does not exist"
        }
    }   
    // check if pwd is correct
    const verification = await verifyPassword(pwd,user.password_hash);
    if (!verification){
        return {
            success:false,
            message:"Please enter the correct password"
        }
    }
    const token = signUserToken({
        sub:user.name,
        id:user.id,
        role:user.role
    });
    if (!token) {
        return {
            success: false,
            message: "JWT secret is not configured"
        }
    }

    return {
        success: true,
        message: "Logged in",
        token
    }
}