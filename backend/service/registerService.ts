import { RegisterBody } from "../schema/auth";
import type { AuthResult } from "../types/auth";
import { signUserToken } from "../utils/jwt";
import { hashPassword } from "../utils/password";
import { prisma } from "../utils/prisma";


export default async function registerService(userBody: RegisterBody):Promise<AuthResult> {
    const existing = await prisma.user.findUnique({
        where: { email: userBody.email },
    });
    if (existing) {
        return {
            success: false,
            message: "email already in use",
        };
    }
    //  prisma.create type checks the data passed with model
    const newUser = await prisma.user.create({
        data: {
            name: userBody.name,
            email: userBody.email,
            password_hash: await hashPassword(userBody.pwd),
            role: userBody.role,
        },
    });
    console.log(newUser);
    const token = signUserToken({
        name: newUser.name,
        role: newUser.role,
    });
    if (!token) {
        return {
            success: false,
            message: "JWT secret is not configured",
        };
    }

    return {
        success: true,
        message: "Logged in",
        token,
    };
}
