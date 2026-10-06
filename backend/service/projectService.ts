import { ProjectBody } from "../schema/project";
import { prisma } from "../utils/prisma";

export default async function projectService(projectBody: ProjectBody) {
    const developerIds = [...new Set(projectBody.developer_ids)];

    try {
        await prisma.$transaction(async (tx)=>{
            // verify that the project is assigned to a project manager
            const pm = await tx.user.findFirst({
                where:{id:projectBody.assigned_pm_id, role:"project_manager"}
            })
            if(!pm){
                throw new Error("Project must be created by a project manager")
            }

            // verify that the projectRequest exists and belongs to the project manager
            const request = await tx.projectRequests.findFirst({
                where: {
                    id: projectBody.project_request_id,
                    assigned_pm_id: pm.id,
                    status: "assigned",
                    project: { is: null },
                },
            });
            if (!request) {
                throw new Error("Project request must be assigned to this project manager");
            }


            // create the project row
            const project = await tx.project.create({
                data:{
                    project_request_id:request.id,
                    name:projectBody.name,
                    description:projectBody.description,
                    assigned_pm_id:pm.id
                }
            })

            // verify that the user selected for project are unassigned devs and assign them
            const assigned = await tx.user.updateMany({
                where: {
                    id: { in: developerIds },
                    role: "developer",
                    manager_id: pm.id,
                    project_id: null,
                },
                data: { project_id: project.id },
            });
            if(assigned.count!==developerIds.length){
                throw new Error("Every member must be a dev and available on the team.")
            }
            
            //change the status of the project request
            await tx.projectRequests.update({
                where:{id:request.id},
                data:{
                    status:"converted"
                }
            });

        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Project could not be created."
        return {success:false, message};
    }

    return {
        success:true,
        message:"Project created."
    }
}