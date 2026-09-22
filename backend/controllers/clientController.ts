import { Request, Response } from "express"
import { z } from "zod";
import { clientSchema } from "../schema/client";
import clientService from "../service/clientService";

export default function clientController(req: Request, res: Response){
    
    const parsed = clientSchema.safeParse(req.body);
    console.log(parsed);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid body",
            issues: z.flattenError(parsed.error)
        });
    }


    const result = clientService(parsed.data);

    if (!result.success) {
        return res.status(400).json({
            message: result.message
        });
    }

    return res.status(200).json({
        message: result.message
    });


}