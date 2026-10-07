export type AuthResult = {
    success: boolean
    message: string
    token?: string
}

export type JwtPayload = {
    sub: string
    id: number
    role: string
}
// declare is a ts only instruction which tell ts that this thing is just for type checking, dont generate any js for this
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}
// the file making global scope changes is required to be a module by ts
export {}
