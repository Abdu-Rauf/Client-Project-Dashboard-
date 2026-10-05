import { ProjectReqBody } from "../schema/projectReq";
import { ProjectRequest } from "../types/projectRequest";
import { prisma } from "../utils/prisma";


export default async function projectRequestService(projectBody: ProjectReqBody) {
    // pmid is the fk for project desc ( relationship: one to many (pm-pdesc))
    try {
        await prisma.$transaction(async (tx)=>{
            const pm = await tx.user.findFirst({
                where:{
                    id:projectBody.assigned_pm_id,
                    role:"project_manager"
                }
            })
            if(!pm){
                throw new Error("Project Request must be assigned to a project manager")
            }
            const prReq = await tx.projectRequests.create({
                data:{
                    title: projectBody.title,
                    description: projectBody.description,
                    assigned_pm_id: projectBody.assigned_pm_id,
                    deadline:projectBody.deadline,
                }
            });
            console.log("Project Request:\n", prReq)
        });
        
    } catch (error) {
        const message = error instanceof Error? error.message:"Failed to create Project Request."
        return {
            success:false,
            message
        }
    }
    return {
        success: true,
        message: "Project request created"
    };
}
