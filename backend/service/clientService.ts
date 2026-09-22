import { success } from "zod";
import { clientBody } from "../schema/client";

// mock client store (later: db)
const clients = [
    {
        name: "aamir",
        email: "aamir@gmail.com",
        contact: "9003493929"
    },
    {
        name: "abswoof",
        email: "abswoof@gmail.com",
        contact: "9876543210"
    },
    {
        name: "riya",
        email: "riya@gmail.com",
        contact: "9123456780"
    }
]

export default function clientService(clientBody:clientBody) {

    const client = clients.find((c) => c.email === clientBody.email);
    if(client){
        return {
            success:false,
            message:"client already exists"
        }
    }
    
    clients.push(clientBody);
    return {
        success:true,
        message:"created client"
    }

}
