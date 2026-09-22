import { RegisterBody } from "../schema/auth";
import { User } from "../types/user";
import { signUserToken } from "../utils/jwt";


export default function registerService(userBody: RegisterBody) {

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

    const user = users.find((u) => u.email === userBody.email);
    //  do i need email regex check here? 
    if (user) {
        return {
            success:false,
            message:"email already in use"
        }
    }
    // id would be assigned by db later   
    const newUser: User = {
        id: users.length + 1,
        name: userBody.name,
        email: userBody.email,
        pwd: userBody.pwd,
        role: userBody.role
    }
    users.push(newUser)

    const token = signUserToken(newUser);
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