import { prefault } from "zod";
import { ProjectReqBody } from "../schema/projectReq";
import { ProjectRequest } from "../types/projectRequest";
import { prisma } from "../utils/prisma";


export default async function projectRequestService(projectBody: ProjectReqBody) {
    // pmid is the fk for project desc ( relationship: one to many (pm-pdesc))
    const prReq = await prisma.projectRequests.create({
        data:{
            title: projectBody.title,
            description: projectBody.description,
            assigned_pm_id: projectBody.assigned_pm_id,
            deadline:projectBody.deadline,
        }
    });
    console.log("Project Request:\n", prReq)
    return {
        success: true,
        message: "Project request created"
    };
}
