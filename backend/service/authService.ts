type AuthResult = {
    success: boolean
    message: string
}

export default function authService(email: string, pwd: string): AuthResult {

    // this would be call repo and get users
    const users  = [
        {
            email:"aamir@gmail.com",
            pwd: "yea right",
            role:"admin"
        },
        {
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
    return {
        success:true,
        message:"Logged in"
    }
}