import jwt from "jsonwebtoken";

type TokenUser = {
    name: string
    role: string
}

export function signUserToken(user: TokenUser): string | null {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return null;
    }

    return jwt.sign(
        {
            sub: user.name,
            role: user.role
        },
        secret,
        { expiresIn: "1h" }
    );
}
