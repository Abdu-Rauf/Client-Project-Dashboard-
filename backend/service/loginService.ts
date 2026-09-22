import { signUserToken } from "../utils/jwt";

type AuthResult = {
    success: boolean
    message: string
    token?: string
}

export default function authService(email: string, pwd: string): AuthResult {

    // this would be call repo and get users
    const users  = [
        {
            id:1,
            name:"aamir",
            email:"aamir@gmail.com",
            pwd: "yea right",
            role:"admin"
        },
        {
            id:2,
            name:"abswoof",
            email:"abswoof@gmail.com",
            pwd: "no mate",
            role:"project manager",
        }
    ]

    const user = users.find((u) => u.email === email);
    if (!user) {
        return {
            success:false,
            message:"user does not exist"
        }
    }   
    // check if pwd is correct
    if (user.pwd !== pwd) {
        return {
            success:false,
            message:"Please enter the correct pwd"
        }
    }

    const token = signUserToken(user);
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